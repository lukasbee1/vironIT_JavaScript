import EventEmitter from './EventEmitter';

test('check', () => {
  const emitter = new EventEmitter();
  const handler = jest.fn();
  emitter.on('e', handler);
  expect(emitter.eventTable).toHaveProperty('e');
});
