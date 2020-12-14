import EventEmitter from '../EventEmitter';

export default class QueueUI extends EventEmitter {
  updateQueue(count) {
    const old = document.getElementsByClassName('queueCount')[0];

    const queueCount = document.createElement('div');

    queueCount.innerHTML = `<h2>${count}</h2>`;
    queueCount.setAttribute('class', 'queueCount');

    const entry = document.getElementsByClassName('queue')[0];
    entry.replaceChild(queueCount, old);
  }
}
