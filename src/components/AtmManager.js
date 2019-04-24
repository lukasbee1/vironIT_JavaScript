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
    this.emit('queueCount', this.queue.count);
  }
  removePerson(){
    this.count--;
    this.emit('queueCount', this.queue.count);
  }

  createQueue(min, max) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      this.addPerson();
      this.createQueue(min, max);
    }, rand);
  }
   start = () => {
    this.atm.on('status', () => {
      if (this.atm.getStatus === 'free') {
        if (this.queue.getCount != 0){
          // const min = 500;
          // const max = 3000;
          // let rand = Math.floor(Math.random() * (max - min + 1) + min);
          this.logger.AtmFree();

          this.atm.working();
          this.queue.removePerson();
        }
      } else {
        this.logger.AtmBusy();
      }
    })
    this.queue.on('queueCount', this.logger.QueueUpdated(this.queue.count));
    setTimeout(() => {
      this.start();
    }, 1000);
  }
}
