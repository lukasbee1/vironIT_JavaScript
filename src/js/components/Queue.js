import EventEmitter from './EventEmitter';
import Person from './Person';

export default class Queue extends EventEmitter {
  constructor() {
    super();
    this.personArray = [];
  }

  getCount() {
    // emit('queueCount', this.count);
    return this.personArray.length;
  }

  addPerson() {
    const person = new Person();
    person.setTimeWait(500, 8000);
    this.personArray.push(person);
    this.emit('queueCount', this.count);
  }

  removePerson() {
    this.personArray.splice(0, 1);
    this.emit('queueCount', this.count);
  }
}
