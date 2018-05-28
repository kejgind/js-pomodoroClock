// Find HTML element to append application
const appWrap = document.querySelector('.app');

// Create layout for application
const appHeader = '<h1 class=\'app__name\'>JavaScript - Pomodoro Clock</h1>';

const timeChange = purpose => `
  <div class='buttons__wrapper wrap__${purpose}'>
    <button class='button button__subtract ${
  purpose
}__time' data-time='subtract'>&#150;</button>
    <p class='display__selection display__${purpose}'>5</p>
    <button class='button button__add ${
  purpose
}__time' data-time='add'>&#43;</button>
  </div>
`;

const timeDisplay = `
  <div class='time__display'>
    <p class='current__time'>25</p>
    <p class='current__status'>work</p>
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

createLayout(appWrap, appHeader, ['break','work'], timeChange, timeDisplay);


