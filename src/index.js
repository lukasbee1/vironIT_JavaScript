// entry point
import AtmManager from './components/AtmManager'


let manager = new AtmManager();

manager.queue.addPerson();
manager.queue.addPerson();
manager.queue.addPerson();
manager.addAtm();
manager.addAtm();
manager.start();
manager.queue.addPerson();

manager.startLogging();
//manager.createQueue(1000,5000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);