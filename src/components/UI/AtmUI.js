import EventEmitter from '../EventEmitter';

export default class AtmUI extends EventEmitter {
  constructor() {
    super();
    this.atmTable = [];

  }
  drawATM(i) {
    let atm = document.createElement('div');

    atm.innerHTML = '<h1>ATM</h1>';
    atm.setAttribute('class', 'atm free');
    atm.setAttribute('id', i);
    
    this.atmTable.push(atm);
  }
  setBusy(id) {
    let atm = document.getElementById(id);
    atm.setAttribute('class', 'atm busy');
  }
  setFree(id) {
    let atm = document.getElementById(id);
    atm.setAttribute('class', 'atm free');
  }
  
  renderATMs() {
    let entry = document.getElementById("entry");


    this.atmTable.forEach(atm => {
      entry.appendChild(atm);
    });
  }
} 