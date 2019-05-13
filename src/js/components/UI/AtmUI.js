import EventEmitter from '../EventEmitter';

export default class AtmUI extends EventEmitter {
  constructor() {
    super();
    this.atm = null;
    this.count = 0;
  }

  drawAtm(atm) {
    const atmBlock = document.createElement('div');
    const entry = document.getElementsByClassName('atms');
    this.count = atm.getCount();
    
    atmBlock.innerHTML = `<h1>ATM</h1> ${atm.getCount()}`;
    atmBlock.setAttribute('class', 'atm free');
    this.atm = atmBlock;
    entry[0].appendChild(this.atm);
  }

  changeCounter(atm) {
    this.atm.innerHTML = `<h1>ATM</h1> ${atm.getCount()}`;
  }

  setBusy() {
    this.atm.setAttribute('class', 'atm busy');
  }

  setFree() {
    this.atm.setAttribute('class', 'atm free');
  }

  removeAtm() {
    const entry = document.getElementsByClassName('atms')[0];
    const atm = document.getElementsByClassName('atm')[0];
    if (atm) {
      entry.removeChild(this.atm);
    }
  }
}
