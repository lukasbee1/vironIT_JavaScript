import EventEmitter from '../EventEmitter';

export default class AtmUI extends EventEmitter {
  constructor() {
    super();
    this.atm = null;
    this.count = 0;
  }
  drawAtm(atm) {
    let atmBlock = document.createElement('div');
    let entry = document.getElementsByClassName("atms");
    this.atm = atmBlock;
    this.count = atm.getCount();

    atmBlock.innerHTML =
      `<h1>ATM</h1>
        ${atm.count}
      `;
    atmBlock.setAttribute('class', 'atm free');
    entry[0].appendChild(atmBlock);

  }
  changeCounter(atm) {
    this.atm.innerHTML =
      `
        <h1>ATM</h1>
        ${atm.getCount()}
      `;
    
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