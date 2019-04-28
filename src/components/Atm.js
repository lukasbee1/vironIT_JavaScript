import EventEmitter from './EventEmitter';

export default class Atm extends EventEmitter {
  constructor() {
    super();
    this.state = 'free';
    this.count = 0;
  }

  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
  _free() {
    this.setState('free');
    this.emit('free', this.state);
  }

  working() {
    this.count++;
    this.setState('busy');
    this.emit('busy', this.state);
  }
}








