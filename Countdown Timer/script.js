let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const expireTime = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(expireTime);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((expireTime - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const second = seconds % 60;

  timerDisplay.textContent = `${minutes}:${second < 10 ? '0' : ''}${second}`;
}

function displayEndTime(timestamp) {
  const expireTime = new Date(timestamp);

  const hours = expireTime.getHours();
  const minutes = expireTime.getMinutes();

  endTimeDisplay.textContent = `Timer ends at ${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function setTimer(e) {
  timer(parseInt(this.dataset.time));
}

timerButtons.forEach((button) => button.addEventListener('click', setTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});

/*
Learning : 

1. How setInterval works, how to stop it and how it can not be relied upon 100% 
of the time (it can be stopped by the browser for performmance purposes)

2. The built in Date object and the various methods related to it.
*/
