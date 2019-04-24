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
}





// Queue.prototype.addPerson = function() {
//   this.count++;
//   this.emit('number', this.count);
// }
// Queue.prototype.removePerson = function() {
//   this.count--;
//   this.emit('number', this.count);
// }

// Queue.prototype.generate = function(min, max) {
//   let rand = Math.floor(Math.random() * (max - min + 1) + min);
  
//   setTimeout(() => {
//     this.newQuery(this.count);
//     this.generate(min,max);
//   }, rand);

// }