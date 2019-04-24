
export default class Logger {
  AtmBusy() {
    console.log("Atm busy!");
  }
  AtmFree() {
    console.log("Atm free, you can use!");
  }
  QueueUpdated(count) {
    console.log("Members in queue: " + count);
  }
  Waiting() {
    console.log("Waiting...");
  }
}