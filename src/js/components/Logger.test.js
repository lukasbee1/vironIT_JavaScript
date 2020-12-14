import Logger from './Logger';

const log = new Logger();

test('check message', () => {
  global.console = { log: jest.fn() };

  log.AtmBusy(3);
  expect(console.log).toBeCalled();

  log.AtmFree();
  expect(console.log).toBeCalled();

  log.QueueUpdated(4);
  expect(console.log).toBeCalled();

  log.AllBusy();
  expect(console.log).toBeCalled();

  log.FoundedFreeAtm();
  expect(console.log).toBeCalled();
});
