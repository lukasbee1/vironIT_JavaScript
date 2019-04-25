import EventEmitter from './EventEmitter';
import Atm from './Atm';
import Queue from './Queue';
import Logger from './Logger';


export default class AtmManager extends EventEmitter {
  constructor() {
    super();
    this.AtmTable = [];
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

  startLogging() {
    this.queue.on('queueCount', () => {
      this.logger.QueueUpdated(this.queue.getCount());
    });
    this.atm.on('status', () => {
      if (this.atm.getStatus() === 'free') {
        this.logger.AtmFree();
      } else {
        this.logger.AtmBusy();
      }
    });
  }
  start = () => {
    this.queue.on('queueCount', () => {
      if (this.queue.getCount() != 0 && this.atm.getStatus() === 'free') {
        setTimeout(() => {
          this.atm.working();
          setTimeout(() => {
            this.removePerson();
            this.atm._free();
          }, 7000);
        }, 1000);
      }
    })

    this.atm.on('status', () => {
      if (this.atm.getStatus() === 'free') {


      }

    })

  }
}
