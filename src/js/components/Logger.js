
export default class Logger {
  AtmBusy(i) {
    console.log(`${i} Atm busy!`);
  }

  AtmFree(count, i) {
    console.log(`${i} Atm free! Just 1 second`);
  }

  QueueUpdated(count) {
    console.log(`Updated! Members in queue: ${count}`);
  }

  AllBusy() {
    console.log('All atms busy, wait...');
  }

  FoundedFreeAtm() {
    console.log('Found Free Atm');
  }
}
