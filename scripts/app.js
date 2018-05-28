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
  <div class='time__display'>
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
const displayCurrentTime = document.querySelector('.current__time');
const displayCurrentPurpose = document.querySelector('.current__purpose');

console.log(displayCurrentPurpose);

// Application current state
const globalState = {
  workTime: 25,
  breakTime: 5,
  currentTime: 25,
  purpose: 'work',
  currentStatus: 'stop',
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
  globalState.currentTime = globalState.workTime;
  displayCurrentTime.innerText = globalState.currentTime;
  displayCurrentPurpose.innerText = globalState.purpose;
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
  console.log(input);

  stateChanger(input);
  // console.log(globalState);
  displayChanger();
};

// Functions to handle button clicks
const buttonsHandler = event => {
  event.target.classList.contains('button') ? timeSetting(event.target) : '';
};

// Events catcher
selectionTimers.forEach(el => el.addEventListener('click', buttonsHandler));

console.log(appWrap);
