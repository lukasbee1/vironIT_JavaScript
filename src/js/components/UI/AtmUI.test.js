/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
import AtmUI from './AtmUI';
import Atm from '../Atm';

document.body.innerHTML = '<div id="entry"><div class="atms"></div><div id="down"><div class="queue"><div class="queueCount"></div></div></div></div>';


const atm = new Atm();
const atmUI = new AtmUI();
atmUI.drawAtm(atm);

test('checking UI', () => {
  expect(atmUI.atm.innerHTML).toBe(`<h1>ATM</h1> ${atm.getCount()}`);
});

test('change count', () => {
  atm.count = 5;
  atmUI.changeCounter(atm);
  expect(atmUI.atm.innerHTML).toBe(`<h1>ATM</h1> ${atm.getCount()}`);
});

test('busy atm', () => {
  atmUI.setBusy();
  const atmsBlock = document.getElementsByClassName('atms')[0];

  expect(atmsBlock.innerHTML).toBe(`<div class="atm busy"><h1>ATM</h1> ${atm.getCount()}</div>`);
});

test('free atm', () => {
  atmUI.setFree();
  const atmsBlock = document.getElementsByClassName('atms')[0];

  expect(atmsBlock.innerHTML).toBe(`<div class="atm free"><h1>ATM</h1> ${atm.getCount()}</div>`);
});

test('remove atm', () => {
  atmUI.removeAtm();
  const atmsBlock = document.getElementsByClassName('atms')[0];

  expect(atmsBlock.innerHTML).not.toBe(`<div class="atm free"><h1>ATM</h1> ${atm.getCount()}</div>`);
});

test('remove atm2', () => {
  atmUI.drawAtm(atm);
  atmUI.removeAtm();
  const atmsBlock = document.getElementsByClassName('atms')[0];

  expect(atmsBlock.innerHTML).toBe('');
});
