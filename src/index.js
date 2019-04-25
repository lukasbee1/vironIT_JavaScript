// entry point
import AtmManager from './components/AtmManager'


let manager = new AtmManager();


manager.addAtm();
manager.addAtm();
manager.startLogging();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.addPerson();
manager.start();
manager.startWork();
//manager.createQueue(2000,3000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);