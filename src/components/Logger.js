
export default class Logger {
  AtmBusy() {
    console.log("Atm busy!");
  }
  AtmFree() {
    console.log("Atm free! Just 1 second");
  }
  AtmReady() {
    console.log("Atm ready to work");
  }
  QueueUpdated(count) {
    console.log("Updated! Members in queue: " + count);
  }
  Waiting() {
    console.log("Waiting...");
  }
}