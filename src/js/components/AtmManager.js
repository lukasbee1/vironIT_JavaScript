/* eslint-disable linebreak-style */
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
    this.atmUiTable = [];
    this.queue = new Queue();
    this.queueUI = new QueueUI();
    this.logger = new Logger();
  }

  createQueue(min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(() => {
      this.queue.addPerson();
      this.createQueue(min, max);
    }, rand);
  }

  startLogging() {
    this.queue.on('queueCount', () => {
      this.logger.QueueUpdated(this.queue.getCount());
    });

    this.atmTable.forEach((atm, i) => {
      atm.on('free', () => {
        this.logger.AtmFree(this.queue.getCount(), i + 1);
      });
      atm.on('busy', () => {
        this.logger.AtmBusy(i + 1);
      });
    });

    this.on('allBusy', () => {
      this.logger.AllBusy();
    });
    this.on('foundedAtm', () => {
      this.logger.FoundedFreeAtm();
    });
  }

  addAtm() {
    const atm = new Atm();
    const atmUI = new AtmUI();
    atmUI.drawAtm(atm);
    atm.on('free', () => {
      const served = atm.getCount();
      atmUI.setFree();
      atmUI.changeCounter(atm);
      this.startWork();
      setTimeout(() => {
        if (atm.getState() !== 'unworking' && atm.getState() === 'free' && served === atm.getCount()) {
          atmUI.removeAtm();
          this.removeAtm(atm, atmUI);
        }
      }, 4000);
    });
    atm.on('busy', () => {
      atmUI.setBusy();
      setTimeout(() => {
        if (!AtmManager.isFreeAtm(atm)) {
          atm.setState('free');
        }
      }, this.queue.personArray[0].getTimeWait()); //bug 0 - index
      this.queue.removePerson();
    });
    this.count += 1;
    atm.setState('free');
    this.atmTable.push(atm);
    this.atmUiTable.push(atmUI);
    this.emit('foundedAtm');
  }

  removeAtm(atm, atmUI) {
    if (atm && atmUI) {
      this.atmUiTable = this.atmUiTable.filter(a => a !== atmUI);
      this.atmTable = this.atmTable.filter(a => a !== atm);
    }
  }

  createAtmListener() {
    const btn = document.createElement('button');
    const parent = document.getElementById('down');

    btn.innerHTML = '<h2>Add ATM</h2>';
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', 'addBtn');
    parent.appendChild(btn);
    btn.addEventListener('click', () => this.addAtm());
  }

  createRemoveButton() {
    const btn = document.createElement('button');
    const parent = document.getElementById('down');
    btn.innerHTML = '<h2>Remove ATM</h2>';
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', 'addBtn');
    parent.appendChild(btn);
    btn.addEventListener('click', () => {
      this.atmTable[this.atmTable.length - 1].setState('unworking');
      this.atmUiTable[this.atmUiTable.length - 1].removeAtm();
      this.removeAtm(this.atmTable[this.atmTable.length - 1], this.atmUiTable[this.atmUiTable.length - 1]);
    });
  }

  static isFreeAtm(atm) {
    return atm.state === 'free';
  }

  startWork() {
    if (this.queue.getCount() > 0) {
      setTimeout(() => {
        const freeAtm = this.atmTable.find(AtmManager.isFreeAtm);
        if (freeAtm) {
          if (this.queue.getCount() > 0 && freeAtm.state === 'free') {
            freeAtm.working();
            if (this.atmTable[this.atmTable.length - 1].getState() === 'busy') {
              this.emit('allBusy');
            }
          }
        }
      }, 1000);
    }
  }

  start() {
    this.queue.on('queueCount', () => {
      this.queueUI.updateQueue(this.queue.getCount());
      this.startWork();
      if (this.queue.getCount() > 10) {
        setTimeout(() => {
          this.addAtm();
        }, 1500);
      }
    });
  }
}
