// entry point
import './css/style.css';
import AtmManager from './components/AtmManager';


let manager = new AtmManager();

//atmUI.renderATMs();
manager.addAtm();
manager.addAtm();
manager.addAtm();
manager.startLogging();
manager.start();
manager.createAtmListener();
// manager.queue.addPerson();


manager.createQueue(1000, 2000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);