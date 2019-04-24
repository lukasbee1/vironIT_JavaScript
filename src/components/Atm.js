import EventEmitter from './EventEmitter';

export default function Atm() {
  EventEmitter.call(this);
  this.state = 'free';
  this.count = 0;
}
Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = EventEmitter;

Atm.prototype.working = function(){
  this.count++;
  this.state = 'busy';
  console.log("Atm is working, state:" + this.state);
  this.emit('balance');
}






