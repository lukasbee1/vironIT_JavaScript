import EventEmitter from './EventEmitter';
import Atm from './Atm';
import Queue from './Queue';
import Logger from './Logger';


export default class AtmManager extends EventEmitter {
  constructor() {
    super();
    this.atmTable = [];
    this.queue = new Queue();
    this.logger = new Logger();
  }
  addPerson() {
    this.queue.count++;
    this.queue.emit('queueCount', this.queue.count);
  }
  removePerson() {
    this.queue.count--;
    this.queue.emit('queueCount', this.queue.count);
  }

  createQueue(min, max) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(() => {
      this.addPerson();
      this.createQueue(min, max);
    }, rand);
  }
  findFreeAtm() {
    atmTable.forEach(element => {
      if (element.getStatus() === 'free') {
        return element;
      }
    });
  }

  startLogging() {
    this.queue.on('queueCount', () => {
      this.logger.QueueUpdated(this.queue.getCount());
    });
    // this.atm.on('free', () => {
    //   this.logger.AtmFree();
    // });
    // this.atm.on('busy', () => {
    //   this.logger.AtmBusy();
    // });
    this.atmTable.forEach(atm => {
      atm.on('free', () => {
        this.logger.AtmFree();
      });
    });
    this.atmTable.forEach(atm => {
      atm.on('busy', () => {
        this.logger.AtmBusy();
      });
    });
  }
  addAtm() {
    const atm = new Atm();
    this.atmTable.push(atm);
  }

  start = () => {
    this.queue.on('queueCount', () => {
      if (this.queue.getCount() === 1) {
        for (let i = 0; i < this.atmTable.length; i++) {
          if (this.atmTable[i].getStatus() === 'free') {
            this.atmTable[i].working();
            this.removePerson();
            setTimeout(() => {
              setTimeout(() => {
                this.atmTable[i]._free();
              }, 5000);
            }, 1000);
            break;

          }
        }
      }
    });
    //subscribe on each atm
    this.atmTable.forEach(atm => {
      atm.on('free', () => {
        if (this.queue.getCount() > 1) {
          setTimeout(() => {
            atm.working();
            this.removePerson();

            setTimeout(() => {
              atm._free();
            }, 5000);
          }, 1000);

        }
      });
    });
  }
}
