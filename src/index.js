// entry point
import Atm from './components/Atm';
import Queue from './components/Queue';

let bancomat = new Atm();
bancomat.on('balance', () => {console.log("checked balace");});
bancomat.working();

let queue = new Queue();
queue.newQuery(1);
queue.newQuery(2);
queue.newQuery(3);

