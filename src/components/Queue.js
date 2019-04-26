import EventEmitter from './EventEmitter';

export default class Queue extends EventEmitter {
  constructor() {
    super();
    this.count = 0;
  }
  
  getCount() {
    //emit('queueCount', this.count);
    return this.count;
  }
  addPerson() {
    this.count++;
    this.emit('queueCount', this.count);
  }

  removePerson() {
    this.count--;
    this.emit('queueCount', this.count);
  }
}
