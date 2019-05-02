export default class EventEmitter {
  constructor() {
    this.eventTable = {};
  }

  emit(eventName, ...args) {
    const event = this.eventTable[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.apply(null, args);
      });
    }
  }

  on(eventName, fn) {
    if (!this.eventTable[eventName]) {
      this.eventTable[eventName] = [];
    }
    this.eventTable[eventName].push(fn);
    return () => {
      this.eventTable[eventName] = this.eventTable[eventName].filter(eventFn => fn !== eventFn);
    };
  }
}
