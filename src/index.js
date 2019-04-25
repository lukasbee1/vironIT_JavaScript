// entry point
import Atm from './components/Atm';
import Queue from './components/Queue';
import AtmManager from './components/AtmManager'


let manager = new AtmManager();


manager.start();
manager.startLogging();
manager.createQueue(1000,7000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);