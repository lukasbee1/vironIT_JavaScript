import EventEmitter from './EventEmitter';

export default class Atm extends EventEmitter {
  constructor() {
    super();
    this.state = null;
    this.count = 0;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    if (state === 'free') {
      this.emit('free', this.state);
    } else if (state === 'busy') {
      this.emit('busy', this.state);
    }
  }

  getCount() {
    return this.count;
  }

  working() {
    this.setState('busy');
    this.count += 1;
  }
}
