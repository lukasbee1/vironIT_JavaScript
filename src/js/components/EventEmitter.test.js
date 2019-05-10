import EventEmitter from './EventEmitter';

const emitter = new EventEmitter();
const handler = jest.fn();

test('check', () => {
  emitter.on('e', handler);
  expect(emitter.eventTable).toHaveProperty('e');
});

test('eventTable', () => {
  emitter.emit('click', handler);
  expect(emitter.eventTable.e).toContain(handler);
});

test('remove from table', () => {
  const handler2 = jest.fn();
  const unsubscribe = emitter.on('name', handler2);
  unsubscribe();
  expect(emitter.eventTable.name).not.toContain(handler);
});
test('array', () => {
  emitter.emit('e', 1);
  expect(handler).toHaveBeenCalledWith(1);
});

test('check empty name', () => {
  const handler2 = jest.fn();
  emitter.on('e', handler2);
  expect(emitter.eventTable.e).toContain(handler, handler2);
});

