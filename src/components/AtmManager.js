import EventEmitter from './EventEmitter';
import Atm from './Atm';
import Queue from './Queue';
import Logger from './Logger';
import AtmUI from './UI/AtmUI';


export default class AtmManager extends EventEmitter {
  constructor() {
    super();
    this.count = 0;
    this.atmTable = [];
    this.queue = new Queue();
    this.logger = new Logger();
    this.atmUI = new AtmUI();
  }

  subscribeUI(count) {
    this.atmTable.forEach((atm, i) => {
      atm.on('free', () => {  
        this.atmUI.setFree(i);
      });
      atm.on('busy', () => {
        this.atmUI.setBusy(i);
      });
    });

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
    this.count++;
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
    this.emit('foundedAtm', this.atmTable);
    this.atmUI.drawATM(this.count);
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
            if (this.atmTable[this.atmTable.length-1].getState() === 'busy') {
              this.emit('allBusy');
            }
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