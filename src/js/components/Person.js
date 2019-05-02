export default class Person {
  constructor() {
    this.timeWait = null;
  }

  setTimeWait(min, max) {
    this.timeWait = Math.floor(Math.random() * (max - min + 1) + min);
  }

  getTimeWait() {
    return this.timeWait;
  }
}
