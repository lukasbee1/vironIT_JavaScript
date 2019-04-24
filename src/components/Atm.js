import EventEmitter from './EventEmitter';

export default class Atm extends EventEmitter {
  constructor() {
    super();
    this.state = 'free';
    this.count = 0;
  }
  
  getStatus() {
    return this.state;
  }
  _free() {
    this.state = 'free';
    this.emit('status', this.state);
  }
  working() {
    this.count++;
    this.state = 'busy';
    this.emit('status', this.state);
  }
}








