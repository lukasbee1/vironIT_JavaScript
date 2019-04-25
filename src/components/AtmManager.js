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

  startLogging() {
    this.queue.on('queueCount', () => {
      this.logger.QueueUpdated(this.queue.getCount());
    });

    this.atmTable.forEach(atm => {
      atm.on('free', () => {
        this.logger.AtmFree(this.queue.count);
      });
    });
    this.atmTable.forEach(atm => {
      atm.on('busy', () => {
        this.logger.AtmBusy();
      });
    });
    this.on('allBusy', () => {
      this.logger.AllBusy();
    })
    this.on('foundedFreeAtm', () => {
      this.logger.FoundedFreeAtm();
    })
  }
  addAtm() {
    const atm = new Atm();
    this.atmTable.push(atm);
  }
  waitingFreeATM = () => {
      for (let i = 0; i < this.atmTable.length; i++) {
        this.atmTable[i].on('free', () => {
          this.emit('foundedFreeAtm', this.atmTable[i]);
        });
      }
  }
  
  startWork = () => {
    let bool = false;
    if (this.queue.getCount() > 0) {
      for (let i = 0; i < this.atmTable.length; i++) {
        if (this.atmTable[i].getStatus() === 'free') {
          setTimeout(() => {
            this.atmTable[i].working();
            this.removePerson();
            setTimeout(() => {
              this.atmTable[i]._free();
            }, 5000);
          }, 1000);
          if (i === this.atmTable.length-1) {
            
              this.emit('allBusy');
              if (!bool){
                this.waitingFreeATM();
                
              }
              
              this.on('foundedFreeAtm', () => {
                this.startWork();
                bool = false;
              });
            

          }
          break;
        }
      }
    }
  }
  start = () => {
    this.queue.on('queueCount', this.startWork);
  }
}