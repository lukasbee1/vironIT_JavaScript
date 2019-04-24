// entry point
import Atm from './components/Atm';


let bancomat = new Atm();
bancomat.on('balance', () => {console.log("checked balace");});
bancomat.working();