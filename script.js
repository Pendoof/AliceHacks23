const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const audio = new Audio("alarm.mp3");

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

let hoursForClock;
let minutes;
let ampm;

function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    hoursForClock = hours >= 13 ? hours % 12 : hours;
    minutes = time.getMinutes();
    minutesForAlarm = minutes < 10 ? `0${minutes}` : minutes;
    seconds = time.getSeconds();
    ampm = hours >= 12 ? "PM" : "AM";

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
        hoursForClock,
        0,
        12,
        0,
        360
    )}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
        minutes,
        0,
        60,
        0,
        360
    )}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
        seconds,
        0,
        60,
        0,
        360
    )}deg)`;

    timeEl.innerHTML = `${hoursForClock}:${
        minutes < 10 ? `0${minutes}` : minutes
    } ${ampm}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function checkAlarm(formattedTime) {
    console.log("Checking alarm...");
    const currentTime = `${hoursForClock}:${minutesForAlarm} ${ampm}`;
    console.log("Current time:", currentTime);
    console.log("Formatted time:", formattedTime);
    if (formattedTime == currentTime) {
        audio.play();
        console.log("Alarm played!");
    }
}

setTime();

setInterval(setTime, 1000);