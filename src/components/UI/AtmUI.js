import EventEmitter from '../EventEmitter';

export default class AtmUI extends EventEmitter {
  constructor() {
    super();
    this.atm = null;
  }
  drawAtm() {
    let atmBlock = document.createElement('div');
    let entry = document.getElementsByClassName("atms");
    this.atm = atmBlock;

    atmBlock.innerHTML = '<h1>ATM</h1>';
    atmBlock.setAttribute('class', 'atm free');
    entry[0].appendChild(atmBlock);

  }
  
  setBusy() {
    this.atm.setAttribute('class', 'atm busy');
  }
  setFree() {
    this.atm.setAttribute('class', 'atm free');
  }
  removeAtm() {
    let entry = document.getElementsByClassName("atms");
    entry[0].removeChild(this.atm);

  }
} 