function EventEmitter() {
  this.eventTable = {};
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  console.log(args);
  const event = this.eventTable[eventName];
  if (event) {
    event.forEach(fn => {
      fn.apply(null, args);
    });
  }
}

EventEmitter.prototype.on = function (eventName, fn) {
  if (!this.eventTable[eventName]) {
    this.eventTable[eventName] = [];
  }

  this.eventTable[eventName].push(fn);
  return () => {
    this.eventTable[eventName] = this.eventTable[eventName].filter(eventFn => fn !== eventFn);
  }
}
// ATM Class
function Atm()  {
  this.state = 'free';
  this.count = 0;
}

Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = EventEmitter;



