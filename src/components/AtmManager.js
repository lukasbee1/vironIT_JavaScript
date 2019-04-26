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
    this.unsubscribeFromWaiting = null;

  }

  createQueue(min, max) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(() => {
      this.queue.addPerson();
      this.createQueue(min, max);
    }, rand);
  }

  startLogging() {
    this.queue.on('queueCount', () => {
      this.logger.QueueUpdated(this.queue.getCount());
    });

    for (let i = 0; i < this.atmTable.length; i++) {
      this.atmTable[i].on('free', () => {
        this.logger.AtmFree(this.queue.count, i + 1);
      });
    }
    for (let i = 0; i < this.atmTable.length; i++) {
      this.atmTable[i].on('busy', () => {
        this.logger.AtmBusy(i + 1);
      });
    }
    this.on('allBusy', () => {
      this.logger.AllBusy();
    })
    this.on('foundedFreeAtm', () => {
      this.logger.FoundedFreeAtm();
    })
  }
  addAtm() {
    const atm = new Atm();
    atm.on('free', () => {
      this.startWork();
    });
    atm.on('busy', () => {
      this.queue.removePerson();
      setTimeout(() => {
        if (!this.isFreeAtm(atm)) {
          atm._free();
        }
      }, 5000);
    });
    this.atmTable.push(atm);
  }

  isFreeAtm = (atm) => {
    return atm.state === 'free'
  }

  startWork = () => {
    if (this.queue.getCount() > 0) {
      let freeAtm = this.atmTable.find(this.isFreeAtm);
      if (freeAtm) {
        //this.emit('foundedFreeAtm', this.atmTable);
        setTimeout(() => {
          if (this.queue.getCount() > 0 && freeAtm.state === 'free') {
            freeAtm.working();
            let secAtm = this.atmTable.find(this.isFreeAtm);
            if (!secAtm) this.emit('allBusy');
          }
        }, 2000);
      } 

    }
  }

  start = () => {
    this.queue.on('queueCount', () => { 
      this.startWork() ;
    });
  }
}