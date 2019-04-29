import EventEmitter from './EventEmitter';
import Atm from './Atm';
import Queue from './Queue';
import Logger from './Logger';
import AtmUI from './UI/AtmUI';
import QueueUI from './UI/QueueUI';

export default class AtmManager extends EventEmitter {
  constructor() {
    super();
    this.count = 0;
    this.atmTable = [];
    this.queue = new Queue();
    this.queueUI = new QueueUI();
    this.atmUI = new AtmUI();
    this.logger = new Logger();
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
      this.queueUI.updateQueue(this.queue.count);

    });

    this.atmTable.forEach((atm, i) => {
      atm.on('free', () => {
        this.logger.AtmFree(this.queue.count  , i + 1);
        this.atmUI.setFree(i);
      });
    });

    this.atmTable.forEach((atm, i) => {
      atm.on('busy', () => {
        this.logger.AtmBusy(i + 1);
        this.atmUI.setBusy(i);
      });
    });

    this.on('allBusy', () => {
      this.logger.AllBusy();
    })
    this.on('foundedAtm', () => {
      this.logger.FoundedFreeAtm();
      this.atmUI.drawATM(this.count);
    })
  }

  addAtm() {
    const atm = new Atm();
    this.atmUI.drawATM(this.count++);
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
  }
  
  createAtmListener() {
    let btn = document.createElement('button');
    let parent = document.getElementById('down')

    btn.innerHTML = 'Add ATM';
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', 'addBtn');
    parent.appendChild(btn);
    btn.addEventListener('click', ()  => this.addAtm()); 
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
            if (this.atmTable[this.atmTable.length - 1].getState() === 'busy') {
              this.emit('allBusy');
            }
          }
        }, 1000);
      }
    }
  }

  start = () => {
    this.queue.on('queueCount', () => {
      this.startWork();
    });
  }
}