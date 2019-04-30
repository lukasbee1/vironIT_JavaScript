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
        this.logger.AtmFree(this.queue.count, i + 1);
      });
    });

    this.atmTable.forEach((atm, i) => {
      atm.on('busy', () => {
        this.logger.AtmBusy(i + 1);
      });
    });

    this.on('allBusy', () => {
      this.logger.AllBusy();
    })
    this.on('foundedAtm', () => {
      this.logger.FoundedFreeAtm();
    })
  }
  
  addAtm() {
    const atm = new Atm();
    const atmUI = new AtmUI();
    this.count++;

    atmUI.drawAtm(atm);
    atmUI.on('deleted', () => {
      console.log('asdfasdfasdf');
      atmUI.removeAtm();
    })
    atm.on('free', () => {
      this.startWork();
      atmUI.setFree();

    });
    atm.on('busy', () => {
      atmUI.setBusy();
      this.queue.removePerson();
      setTimeout(() => {
        if (!this.isFreeAtm(atm)) {
          atm._free();
        }
      }, 5000);
    });
    this.emit('foundedAtm');
    this.atmTable.push(atm);
    this.atmUiTable.push(atmUI);
    console.log(this.atmTable)
  }
  removeAtm() {
    this.atmTable.pop();
    const UI = this.atmUiTable.pop();
    UI.emit('deleted', this.atmTable);
    
  }

  createAtmListener() {
    let btn = document.createElement('button');
    let parent = document.getElementById('down');

    btn.innerHTML = '<h2>Add ATM</h2>';
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', 'addBtn');
    parent.appendChild(btn);
    btn.addEventListener('click', () => this.addAtm());
  }
  createRemoveButton() {
    let btn = document.createElement('button');
    let parent = document.getElementById('down');
    btn.innerHTML = '<h2>Remove ATM</h2>';
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', 'addBtn');
    parent.appendChild(btn);
    btn.addEventListener('click', () => this.removeAtm());

  }
  isFreeAtm = (atm) => {
    return atm.state === 'free'
  }

  startWork = () => {
    if (this.queue.getCount() > 0) {
      let freeAtm = this.atmTable.find(this.isFreeAtm);
      if (freeAtm) {
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