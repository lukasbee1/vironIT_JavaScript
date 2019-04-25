
export default class Logger {
  AtmBusy() {
    console.log("Atm busy!");
  }
  AtmFree() {
    console.log("Atm free");
  }
  AtmReady() {
    console.log("Atm ready to work");
  }
  QueueUpdated(count) {
    console.log("Members in queue: " + count);
  }
  Waiting() {
    console.log("Waiting...");
  }
}