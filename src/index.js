// entry point
import './css/style.css';
import AtmManager from './components/AtmManager';
import AtmUI from './components/UI/AtmUI';


let manager = new AtmManager();

manager.queue.addPerson();
manager.queue.addPerson();
manager.queue.addPerson();
manager.addAtm();
manager.addAtm();
manager.start();
manager.queue.addPerson();

manager.startLogging();
manager.subscribeUI();
let atmUI = new AtmUI();
atmUI.drawATM(0);
atmUI.drawATM(1);
atmUI.renderATMs();
manager.createQueue(1000,5000);


//  let bancomat = new Atm();
//  bancomat.on('balance', () => {console.log("checked balace");});
//  bancomat.working();

// let queue = new Queue();
// queue.generate(1000,5000);