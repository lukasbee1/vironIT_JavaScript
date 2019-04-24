import EventEmitter from './EventEmitter';

export default function Queue() {
  EventEmitter.call(this);
  this.count = 0;
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = EventEmitter;

Queue.prototype.newQuery = function() {
  this.count++;
  this.emit('number of count', this.count);
}

Queue.prototype.generate = function(min, max) {
  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  
  setInterval(() => {
    this.newQuery(this.count);
  }, rand);

}