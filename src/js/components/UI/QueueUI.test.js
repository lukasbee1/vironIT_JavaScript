import QueueUI from './QueueUI';

document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>'

test('checking count', () => {
  const queueUI = new QueueUI();
  
  queueUI.updateQueue(15);
  const block = document.getElementsByClassName('queueCount')[0];
  
  expect(block.innerHTML).toBe('<h2>15</h2>');
});