import EventEmitter from './EventEmitter';

export default class Queue extends EventEmitter {
  constructor() {
    super();
    this.count = 0;
  }

  getCount() {
    // emit('queueCount', this.count);
    return this.count;
  }

  addPerson() {
    this.count += 1;
    this.emit('queueCount', this.count);
  }

  removePerson() {
    this.count -= 1;
    this.emit('queueCount', this.count);
  }
}
