import EventEmitter from './EventEmitter';

test('check', () => {
  const emitter = new EventEmitter();
  const handler = jest.fn();
  emitter.on('e', handler);
  expect(emitter.eventTable).toHaveProperty('e');
});

test('subscribe', () => {
  const emitter = new EventEmitter();
  const fn = jest.fn();
  emitter.on('event', fn);
  emitter.emit('event');
  expect(fn).toHaveBeenCalled();
});

test('check111', () => {
  const emitter = new EventEmitter();
  const fn = jest.fn();
  const unsub = emitter.on('event', fn);
  unsub();
  expect(emitter.eventTable.event).not.toContain(fn);
});
