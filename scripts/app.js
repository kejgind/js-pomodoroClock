// Find HTML element to append application
const appWrap = document.querySelector('.app');

// Create layout for application
const appHeader = '<h1 class=\'app__name\'>JavaScript - Pomodoro Clock</h1>';

const timeChange = purpose => `
  <div class='buttons__wrapper wrap__${purpose}'>
    <button class='button button__subtract ${purpose}__time' data-time='${purpose}-subtract'>&#150;</button>
    <p class='display__selection display__${purpose}'></p>
    <button class='button button__add ${purpose}__time' data-time='${purpose}-add'>&#43;</button>
  </div>
`;

const timeDisplay = `
  <div class='timer'>
    <p class='current__time'></p>
    <p class='current__purpose'></p>
  </div>
`;

const createLayout = (
  insertPoint,
  insertHeader,
  insertArr,
  insertButton,
  insertDisplay
) => {
  insertPoint.insertAdjacentHTML('beforeend', insertHeader);
  insertArr.forEach(el =>
    insertPoint.insertAdjacentHTML('beforeend', insertButton(el))
  );
  insertPoint.insertAdjacentHTML('beforeend', insertDisplay);
};

createLayout(appWrap, appHeader, ['break', 'work'], timeChange, timeDisplay);

// Select elements from DOM, to control app
const selectionTimers = [...document.querySelectorAll('.buttons__wrapper')];
const displayTimers = [...document.querySelectorAll('.display__selection')];

const timerSelector = document.querySelector('.timer');
const displayCurrentTime = document.querySelector('.current__time');
const displayCurrentPurpose = document.querySelector('.current__purpose');

// Application current state
const globalState = {
  workTime: 0.2,
  breakTime: 0.1,
  currentTime: null,
  purpose: 'work',
  currentStatus: 'stop',
};

const addZero = input => (input < 10 ? (input = `0${input}`) : input);

const timeDisplayFormat = input => {
  const minutes = new Date(input).getMinutes();
  const seconds = addZero(new Date(input).getSeconds());
  return `${minutes}:${seconds}`;
};

const displayChanger = () => {
  displayTimers.forEach(el => {
    el.classList.contains('display__work')
      ? (el.innerText = globalState.workTime)
      : '';
    el.classList.contains('display__break')
      ? (el.innerText = globalState.breakTime)
      : '';
  });
  globalState.purpose === 'work'
    ? (globalState.currentTime = globalState.workTime * 60 * 1000)
    : (globalState.currentTime = globalState.breakTime * 60 * 1000);
  displayCurrentTime.innerText = timeDisplayFormat(globalState.currentTime);
  displayCurrentPurpose.innerText = globalState.purpose;
  console.log(globalState);
};

displayChanger();

// Base app functionality
const stateChanger = data => {
  switch (data.dataset.time) {
  case 'break-subtract':
    globalState.breakTime > 0 ? (globalState.breakTime -= 1) : '';
    break;
  case 'break-add':
    globalState.breakTime += 1;
    break;
  case 'work-subtract':
    globalState.workTime > 0 ? (globalState.workTime -= 1) : '';
    break;
  case 'work-add':
    globalState.workTime += 1;
    break;
  }
};

const timeSetting = input => {
  if (globalState.currentStatus === 'stop') {
    stateChanger(input);
    displayChanger();
  }
};

const getStartTime = () => new Date().getTime();
const getWorkEndTime = data => getStartTime() + data * 60 * 1000;
const getBreakEndTime = data => getStartTime() + data * 60 * 1000;
const getPauseTime = data => getStartTime() + data;

let innerInterval;

const runTime = time => {
  globalState.currentTime = time - Date.now();
  displayCurrentTime.innerText = timeDisplayFormat(globalState.currentTime);
  globalState.currentStatus = 'run';
  console.log(globalState);
};

const resetTime = () => {
  clearInterval(innerInterval);
  globalState.currentStatus = 'stop';
};

const changePurpose = () =>
  globalState.currentStatus === 'stop'
    ? globalState.purpose === 'work'
      ? (globalState.purpose = 'break')
      : (globalState.purpose = 'work')
    : '';

const resetCurrentTimer = () =>
  globalState.currentStatus === 'stop'
    ? globalState.purpose === 'work'
      ? (globalState.currentTime = globalState.workTime)
      : (globalState.currentTime = globalState.breakTime)
    : '';

const switcher = () => {
  if (globalState.currentTime <= 0 && globalState.currentStatus === 'run') {
    resetTime();
    changePurpose();
    displayCurrentTime.innerText = 'Change!';
  }
};

const startTimer = () => {
  if (globalState.currentStatus === 'stop') {
    if (
      globalState.purpose === 'work' &&
      globalState.currentTime === globalState.workTime * 60 * 1000
    ) {
      const endWork = getWorkEndTime(globalState.workTime);
      innerInterval = setInterval(() => {
        runTime(endWork);
        switcher();
      }, 200);
    }
    if (
      globalState.purpose === 'break' &&
      globalState.currentTime === globalState.breakTime * 60 * 1000
    ) {
      const endBreak = getBreakEndTime(globalState.breakTime);
      innerInterval = setInterval(() => {
        runTime(endBreak);
        switcher();
      }, 200);
    }
    if (
      (globalState.purpose === 'work' &&
        globalState.currentTime !== globalState.workTime * 60 * 1000) ||
      (globalState.purpose === 'break' &&
        globalState.currentTime !== globalState.breakTime * 60 * 1000)
    ) {
      const endPause = getPauseTime(globalState.currentTime);
      innerInterval = setInterval(() => {
        runTime(endPause);
        switcher();
      }, 200);
    }
  }
  if (globalState.currentStatus === 'run') {
    resetTime();
  }
};

const timerController = e => {
  switch (e.target.classList.value) {
  case 'timer':
    startTimer();
    break;
  case 'current__purpose':
    changePurpose();
    resetCurrentTimer();
    displayChanger();
    break;
  case 'current__time':
    resetCurrentTimer();
    displayChanger();
    break;
  }
};

// Functions to handle button clicks
const buttonsHandler = event => {
  event.target.classList.contains('button') ? timeSetting(event.target) : '';
};

// Events catcher
selectionTimers.forEach(el => el.addEventListener('click', buttonsHandler));
timerSelector.addEventListener('click', timerController);
