// entry point
import Atm from './components/Atm';
import Queue from './components/Queue';
import AtmManager from './components/AtmManager'


let manager = new AtmManager();


manager.createQueue(1000,4000);
manager.start();


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);