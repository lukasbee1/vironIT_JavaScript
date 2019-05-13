import Atm from './Atm';

const atm = new Atm();
const handler = jest.fn();

test('emitter busy in atm', () => {
  atm.on('busy', handler);
  atm.setState('busy');
  expect(atm.getState()).toEqual('busy');
  expect(handler).toHaveBeenCalled();
});

test('emitter free in atm', () => {
  atm.on('free', handler);
  atm.setState('free');
  expect(handler).toHaveBeenCalled();
});

test('working', () => {
  atm.working();
  expect(atm.getCount()).toBe(1);
});
