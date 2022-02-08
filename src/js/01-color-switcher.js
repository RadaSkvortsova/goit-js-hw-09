function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
const startBtn = document.querySelector('button[data-start]');
startBtn.addEventListener('click', eventButtonHandler);
function eventButtonHandler() {
  timerId = setInterval(() => {
    const body = document.querySelector('body');
    const color = getRandomHexColor();

    body.style.backgroundColor = `${color}`;
  }, 1000);
  startBtn.disabled = true;
}
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
