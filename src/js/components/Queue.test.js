import Queue from './Queue';

const queue = new Queue();

test('check', () => {
  queue.addPerson();
  queue.addPerson();
  queue.addPerson();
  expect(queue.personArray).toHaveLength(3);
  expect(queue.getCount()).toEqual(3);
});

test('removing person', () => {
  queue.removePerson();
  expect(queue.personArray).toHaveLength(2);
});
