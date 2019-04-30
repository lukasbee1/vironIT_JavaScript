import EventEmitter from '../EventEmitter';

export default class QueueUI extends EventEmitter {
  drawQueue(count) {
    let queueCount = document.createElement('div');
    
    queueCount.innerHTML = count;
    queueCount.setAttribute('class', 'queueCount');

    let entry = document.getElementsByClassName("queue");
      entry[0].appendChild(queueCount);
  }
  updateQueue(count) {
    let old = document.getElementsByClassName("queueCount")
    let queueCount = document.createElement('div');

    queueCount.innerHTML = `<h2>${count}</h2>`;
    queueCount.setAttribute('class', 'queueCount');

    let entry = document.getElementsByClassName("queue");
    entry[0].replaceChild(queueCount, old[0]);
  }
}