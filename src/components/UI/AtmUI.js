import EventEmitter from '../EventEmitter';

export default class AtmUI extends EventEmitter {
  constructor() {
    super();
    this.atmTable = [];

  }
  drawATM(i) {
    let atm = document.createElement('div');
    let entry = document.getElementsByClassName("atms");


    atm.innerHTML = '<h1>ATM</h1>';
    atm.setAttribute('class', 'atm free');
    atm.setAttribute('id', i);
    entry[0].appendChild(atm);

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
  
  // renderATMs() {
  //   let entry = document.getElementsByClassName("atms");

  //   this.atmTable.forEach(atm => {
  //     entry[0].appendChild(atm);
  //   });
  // }
  createAtmButton(id) {
    let parent = document.getElementById('down')
    let element = document.getElementById(id);
    console.log(element);
    
  }
} 