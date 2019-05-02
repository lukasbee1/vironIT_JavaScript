// entry point
import './css/style.css';
import AtmManager from './js/components/AtmManager';


const manager = new AtmManager();


manager.startLogging();
manager.createAtmListener();
manager.createRemoveButton();
manager.addAtm();
manager.addAtm();
manager.addAtm();
manager.start();
// manager.queue.addPerson();


manager.createQueue(1000, 2000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);
