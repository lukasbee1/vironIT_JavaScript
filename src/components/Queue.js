import EventEmitter from './EventEmitter';

export default function Queue() {
  EventEmitter.call(this);
  this.count = 0;
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = EventEmitter;

Queue.prototype.newQuery = function(count) {
  this.count++;
  this.emit('number of count', count);
}