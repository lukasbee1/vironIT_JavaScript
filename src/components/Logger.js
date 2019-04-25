
export default class Logger {
  AtmBusy() {
    console.log("Atm busy!");
  }
  AtmFree(count) {
    console.log("Atm free! Just 1 second");
    //console.log("members in queue: " + count);
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
  AllBusy() {
    console.log("All atms busy, wait...");
  }
  FoundedFreeAtm() {
    console.log("Founded Free Atm");
  }
}