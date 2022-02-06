import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEAD_LINE = 1000;

const elements = {
  checkDate: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  selectedDate: null,
  intervalID: null,
};

elements.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // window.alert('Please choose a date in the future');
      Notify.failure('Please chjkukhoose a date in the future');
    } else {
      elements.startBtn.disabled = false;
      elements.selectedDate = selectedDates[0].getTime();
    }
  },
};

const calendar = flatpickr(elements.checkDate, options);

elements.startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  elements.startBtn.disabled = true;
  elements.checkDate.disabled = true;
  getTimerTime();
  elements.intervalID = setInterval(getTimerTime, 1000);
}

function getTimerTime() {
  const targetTime = elements.selectedDate;
  const currentTime = Date.now();
  const deltaTime = targetTime - currentTime;
  const timeOptions = convertMs(deltaTime);

  if (deltaTime < DEAD_LINE) {
    clearInterval(elements.intervalID);
  }
  updateTimerInterface(timeOptions);
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  elements.days.textContent = `${days}`;
  elements.hours.textContent = `${hours}`;
  elements.minutes.textContent = `${minutes}`;
  elements.seconds.textContent = `${seconds}`;
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
