
export default class Logger {
  AtmBusy(i) {
    console.log(i + " Atm busy!");
  }
  AtmFree(count, i) {
    console.log(i + " Atm free! Just 1 second");
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
    console.log("Found Free Atm");
  }
}