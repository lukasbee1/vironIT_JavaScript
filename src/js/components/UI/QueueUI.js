import EventEmitter from '../EventEmitter';

export default class QueueUI extends EventEmitter {
  drawQueue(count) {
    const queueCount = document.createElement('div');

    queueCount.innerHTML = count;
    queueCount.setAttribute('class', 'queueCount');

    const entry = document.getElementsByClassName('queue');
    entry[0].appendChild(queueCount);
  }

  updateQueue(count) {
    const old = document.getElementsByClassName('queueCount');
    const queueCount = document.createElement('div');

    queueCount.innerHTML = `<h2>${count}</h2>`;
    queueCount.setAttribute('class', 'queueCount');

    const entry = document.getElementsByClassName('queue');
    entry[0].replaceChild(queueCount, old[0]);
  }
}
