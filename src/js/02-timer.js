import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
 inputEl : document.querySelector("input"),
 startBtn : document.querySelector('[data-start]'),
 daysEl : document.querySelector('[data-days]'),
 hoursEl : document.querySelector('[data-hours]'),
 minutesEl : document.querySelector('[data-minutes]'),
 secondsEl : document.querySelector('[data-seconds]'),
};
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        }
    },
};

const fp = flatpickr(refs.inputEl, options); 
  
function onBtnClick() {
    timerId = setInterval(() => {
        const restTime = convertMs(fp.selectedDates[0] - Date.now());
        markupEdit(restTime);  
        stopTicking(restTime);    
    },  1000);
}; 
  
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function markupEdit({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);

    refs.startBtn.disabled = true;
};

function stopTicking({ days, hours, minutes, seconds }) {
    if (days <=0 && hours <=0 && minutes <=0 && seconds <=0) {
      markupEdit({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
};

refs.startBtn.addEventListener('click', onBtnClick);
