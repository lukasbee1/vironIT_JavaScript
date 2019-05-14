import AtmManager from './AtmManager';

document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
const atmManager = new AtmManager();
const handler = jest.fn();

jest.useFakeTimers();


test('create queue', () => {
  atmManager.createQueue(1000, 3000);
  jest.advanceTimersByTime(3000);
  expect(atmManager.queue.getCount()).toBeGreaterThan(0);
});

test('forEach', () => {
  atmManager.startLogging();
  atmManager.atmTable.push(2);
  atmManager.atmTable.push(2);
  atmManager.atmTable.length = 2;
  atmManager.atmTable.forEach(() => {
    handler();
  });
  expect(handler).toHaveBeenCalledTimes(atmManager.atmTable.length);
});

test('queueUI', () => {
  const atmManager2 = new AtmManager();

  atmManager2.startLogging();
  atmManager2.emit('queueCount');
  atmManager2.queueUI.updateQueue(atmManager2.queue.getCount());
  const block = document.getElementsByClassName('queueCount')[0];

  expect(block.innerHTML).toEqual(`<h2>${atmManager2.queue.getCount()}</h2>`);
});

test('startWork method', () => {
  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';

  const atmManager3 = new AtmManager();
  atmManager3.queue.addPerson();
  atmManager3.addAtm();
  atmManager3.startLogging();
  atmManager3.start();
  atmManager3.atmTable[0].emit = jest.fn();
  atmManager3.atmTable[0].setState('busy');
  expect(atmManager3.atmTable[0].emit).toHaveBeenCalled();
  expect(AtmManager.isFreeAtm(atmManager3.atmTable[0])).toBeFalsy();
  atmManager3.atmTable[0].setState('free');
  expect(AtmManager.isFreeAtm(atmManager3.atmTable[0])).toBeTruthy();
  expect(atmManager3.atmTable[0].state).toEqual('free');
  jest.advanceTimersByTime(1000);

  atmManager3.atmUiTable[0].removeAtm();
  atmManager3.removeAtm(atmManager3.atmTable[0], atmManager3.atmUiTable[0]);
  expect(atmManager3.atmTable).toEqual([]);
});

test('start method', () => {
  const atmManager3 = new AtmManager();
  atmManager3.startLogging();
  atmManager3.start();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();
  atmManager3.queue.addPerson();

  jest.advanceTimersByTime(1600);

  expect(atmManager3.atmTable.length).toBe(1);
});

test('add button', () => {
  atmManager.createAtmListener();

  const v = document.getElementsByClassName('btn')[0];

  expect(v.innerHTML).toEqual('<h2>Add ATM</h2>');
});

test('remove button', () => {
  atmManager.createRemoveButton();

  const v = document.getElementsByClassName('btn')[1];

  expect(v.innerHTML).toEqual('<h2>Remove ATM</h2>');
});

test('finding free atm', () => {
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  atmManager4.startWork();
  atmManager4.atmTable[0].working();
  expect(atmManager4.atmTable[0].getState()).toEqual('busy');
  jest.advanceTimersByTime(1000);
  expect(atmManager4.atmTable[0].getCount()).toEqual(1);
});

test('add atm', () => {
  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.createAtmListener();
  const event = new Event('click');
  const addAtmButton = document.getElementById('addBtn');
  atmManager4.addAtm = jest.fn();
  addAtmButton.dispatchEvent(event);
  expect(atmManager4.addAtm).toHaveBeenCalled();
});

test('remove atm', () => {
  jest.useFakeTimers();

  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.createRemoveButton();
  const event = new Event('click');
  const removeAtmButton = document.getElementById('removeBtn');
  atmManager4.removeAtm = jest.fn();

  atmManager4.atmUiTable[atmManager4.atmUiTable.length - 1].removeAtm = jest.fn();
  removeAtmButton.dispatchEvent(event);
  expect(atmManager4.atmUiTable[atmManager4.atmUiTable.length - 1].removeAtm).toHaveBeenCalled();
  expect(atmManager4.removeAtm).toHaveBeenCalled();
});

test('onBusy', () => {
  jest.useFakeTimers();

  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  const time = atmManager4.queue.personArray[0].getTimeWait();
  atmManager4.atmTable[0].setState('busy');

  jest.advanceTimersByTime(time);
  expect(atmManager4.atmTable[0].getState()).toEqual('free');
});

test('logger', () => {
  jest.useFakeTimers();

  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  atmManager4.startLogging();
  atmManager4.logger.AtmFree = jest.fn();

  atmManager4.atmTable[0].emit('busy');
  atmManager4.atmTable[0].emit('free');

  expect(atmManager4.logger.AtmFree).toHaveBeenCalled();
});

test('auto remove atm', () => {
  jest.useFakeTimers();

  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.atmUiTable[0].removeAtm();
  expect(atmManager4.atmUiTable).toContain(atmManager4.atmUiTable[0]);
  atmManager4.removeAtm(atmManager4.atmTable[0], atmManager4.atmUiTable[0]);

  expect(atmManager4.atmUiTable).toEqual([]);
  expect(atmManager4.atmTable).toEqual([]);
});

// test('if statements 2', () => {
//   jest.useFakeTimers();

//   document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
//   const atmManager4 = new AtmManager();
//   atmManager4.addAtm();
//   atmManager4.queue.addPerson();
//   const time = atmManager4.queue.personArray[0].getTimeWait();
//   atmManager4.atmTable[0].emit('busy');
//   jest.advanceTimersByTime(time);
//   expect(atmManager4.atmTable[0].getState()).toBe('free');
// });

test('if statements', () => {
  jest.useFakeTimers();

  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  const handler1 = jest.fn();
  atmManager4.on('allBusy', handler1);
  atmManager4.startWork();
  
  jest.advanceTimersByTime(1000);
  expect(handler1).toHaveBeenCalled();

});
test('if statements 2', () => {
  jest.useFakeTimers();

  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';
  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  atmManager4.queue.addPerson();
  const handler1 = jest.fn();
  atmManager4.on('allBusy', handler1);
  atmManager4.startWork();
  const time = atmManager4.queue.personArray[1].getTimeWait();
  jest.advanceTimersByTime(atmManager4.queue.personArray[0].getTimeWait() + 2000);
  expect(atmManager4.atmTable[atmManager4.atmTable.length - 1].getState()).toBe('busy');
  expect(handler1).toHaveBeenCalledTimes(2);
  jest.advanceTimersByTime(time);

  expect(atmManager4.atmTable[atmManager4.atmTable.length - 1].getState()).toBe('free');

});

test('if statements 3', () => {
  jest.useFakeTimers();

  const atmManager4 = new AtmManager();
  atmManager4.addAtm();
  atmManager4.addAtm();
  atmManager4.queue.addPerson();
  atmManager4.queue.addPerson();
  const handler1 = jest.fn();
  atmManager4.on('allBusy', handler1);
  atmManager4.startWork();
  atmManager4.startWork();
  
  jest.advanceTimersByTime(1000);
  expect(atmManager4.atmTable[atmManager4.atmTable.length - 1].getState()).toBe('busy');
  expect(handler1).toHaveBeenCalled();
});

test('removing atm method', () => {
  jest.useFakeTimers();
  document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';

  const atmManager6 = new AtmManager();
  atmManager6.addAtm();
  jest.advanceTimersByTime(5000);
});
