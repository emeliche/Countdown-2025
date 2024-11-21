const daysE1 = document.getElementById("days");
const hoursE1 = document.getElementById("hours");
const minsE1 = document.getElementById("mins");
const secondsE1 = document.getElementById("seconds");

const newYears = "1 Jan 2025";

function countdown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = (newYearsDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysE1.innerHTML = days;
  hoursE1.innerHTML = formatTime(hours);
  minsE1.innerHTML = formatTime(mins);
  secondsE1.innerHTML = formatTime(seconds);
}
// для отображения времени в формате "0X"
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

//  вызов счетчика
countdown();

setInterval(countdown, 1000);

//    снежинки
const storageKey = "snow";
const snow = document.querySelector(".snow");
const snowflakes = document.querySelectorAll(".snow__flake");
const snowToggle = document.querySelector(".snow-toggle");

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
//    переберем все снежинки и добавим время анимации + разное начало анимации
snowflakes.forEach((snowflake) => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + "em";
  snowflake.style.animationDuration = getRndInteger(20, 30) + "s";
  snowflake.style.animationDelay =
    getRndInteger(-1, snowflakes.length / 2) + "s";
});

//    выключатель снега
function changeSnowAnimation(animationName) {
  snow.style.setProperty("--animation-name", animationName);
}

snowToggle.addEventListener("change", (event) => {
  changeSnowAnimation(event.target.value);
  localStorage.setItem(storageKey, event.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  let currentStorage = localStorage.getItem(storageKey);

  if (currentStorage) {
    snowToggle.querySelector(
      `.snow-toggle__control[value='${currentStorage}']`
    ).checked = true;
  }

  changeSnowAnimation(currentStorage);

  window.addEventListener("storage", () => {
    changeSnowAnimation(localStorage.getItem(storageKey));
  });
});
