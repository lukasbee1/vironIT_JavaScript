import EventEmitter from './EventEmitter';
import Atm from './Atm';
import Queue from './Queue';
import Logger from './Logger';


export default class AtmManager extends EventEmitter {
  constructor() {
    super();
    this.atmTable = [];
    this.atm = new Atm();
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
  addAtm() {
    const atm = new Atm();
    this.atmTable.push(atm);
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
  start = () => {
    this.queue.on('queueCount', () => {
      if (this.queue.count > 0) {
        for (let i = 0; i < this.atmTable.length; i++ ) {
          if (this.atmTable[i].getStatus() === 'free') {
            this.removePerson();
            this.atmTable[i].working();
            setTimeout(() => {
              setTimeout(() => {
                this.atmTable[i]._free();
              }, 5000);
            }, 1000);
            break;
          }
        }
      }
    })


  }
}
