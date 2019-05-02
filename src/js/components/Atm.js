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
    } else {
      this.emit('busy', this.state);
    }
  }

  free() {
    this.setState('free');
  }

  getCount() {
    return this.count;
  }

  working() {
    this.setState('busy');
    this.count += 1;
  }
}
