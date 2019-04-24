// entry point
import Atm from './components/Atm';
import Queue from './components/Queue';

let bancomat = new Atm();
bancomat.on('balance', () => {console.log("checked balace");});
bancomat.working();

let queue = new Queue();
queue.generate(1000,5000);