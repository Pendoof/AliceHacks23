const alarmForm = document.querySelector(".alarm-container");
const alarmInput = alarmForm.querySelector('input[type="time"]');
const setAlarm = document.querySelector(".set-alarm");

alarmForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const alarmTime = alarmInput.value;
    localStorage.setItem("lastAlarm", alarmTime);
    const formattedAlarmTime = formatTimeIn12Hour(alarmTime);
    setAlarm.textContent = `Alarm set for ${formattedAlarmTime}`;
    sendFormattedTimeToOtherFile(formattedAlarmTime);
});

function sendTime() {
    const lastAlarmTime = localStorage.getItem("lastAlarm");
    if (lastAlarmTime) {
        const formattedLastAlarmTime = formatTimeIn12Hour(lastAlarmTime);
        setAlarm.textContent = `Alarm set for ${formattedLastAlarmTime}`;
        sendFormattedTimeToOtherFile(formattedLastAlarmTime);
    }
};

function formatTimeIn12Hour(timeString) {
    const [hours, minutes] = timeString.split(":");
    const formattedTime = new Date(0, 0, 0, hours, minutes);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return formattedTime.toLocaleTimeString("en-US", options);
}

function sendFormattedTimeToOtherFile(formattedTime) {
    if (typeof checkAlarm === "function") {
        checkAlarm(formattedTime);
    }
}

sendTime()

setInterval(sendTime, 1000);