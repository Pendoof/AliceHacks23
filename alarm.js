const alarmForm = document.querySelector(".alarm-container");
const alarmInputOdd = document.getElementById("odd-alarm");
const alarmInputEven = document.getElementById("even-alarm");
const setAlarmOdd = document.getElementById("set-odd");
const setAlarmEven = document.getElementById("set-even");

alarmForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const alarmTimeOdd = alarmInputOdd.value;
    const alarmTimeEven = alarmInputEven.value;
    localStorage.setItem("lastAlarmOdd", alarmTimeOdd);
    localStorage.setItem("lastAlarmEven", alarmTimeEven);
    const formattedAlarmTimeOdd = formatTimeIn12Hour(alarmTimeOdd);
    const formattedAlarmTimeEven = formatTimeIn12Hour(alarmTimeEven);
    setAlarmOdd.textContent = `Odd alarm set for ${formattedAlarmTimeOdd}`;
    setAlarmEven.textContent = `Even alarm set for ${formattedAlarmTimeEven}`;
    sendFormattedTimeToOtherFile(formattedAlarmTimeOdd, "odd");
    sendFormattedTimeToOtherFile(formattedAlarmTimeEven, "even");
});

function sendTime() {
    const lastAlarmTimeOdd = localStorage.getItem("lastAlarmOdd");
    const lastAlarmTimeEven = localStorage.getItem("lastAlarmEven");
    if (lastAlarmTimeOdd || lastAlarmTimeEven) {
        const formattedLastAlarmTimeOdd = formatTimeIn12Hour(lastAlarmTimeOdd);
        const formattedLastAlarmTimeEven = formatTimeIn12Hour(lastAlarmTimeEven);
        setAlarmOdd.textContent = `Odd alarm set for ${formattedLastAlarmTimeOdd}`;
        setAlarmEven.textContent = `Even alarm set for ${formattedLastAlarmTimeEven}`;
        sendFormattedTimeToOtherFile(formattedLastAlarmTimeOdd, "odd");
        sendFormattedTimeToOtherFile(formattedLastAlarmTimeEven, "even");
    }
}

function formatTimeIn12Hour(timeString) {
    const [hours, minutes] = timeString.split(":");
    const formattedTime = new Date(0, 0, 0, hours, minutes);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return formattedTime.toLocaleTimeString("en-US", options);
}

function sendFormattedTimeToOtherFile(formattedTime, cycle) {
    const alarmData = {
        "11/20": "even",
        "11/21": "odd",
        "11/22": "even",
        "11/27": "odd",
        "11/28": "even",
        "11/29": "odd",
        "11/30": "even",
        "12/1": "odd",
        "12/4": "even",
        "12/5": "odd",
        "12/6": "even",
        "12/7": "odd",
        "12/8": "even",
        "12/11": "odd",
        "12/12": "even",
        "12/13": "odd",
        "12/14": "even",
        "12/15": "odd",
        "12/18": "even",
        "12/19": "odd",
        "12/20": "even",
        "12/21": "odd",
        "12/22": "even",
    };
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    if (alarmData[`${month}/${date}`] == cycle) {
        if (typeof checkAlarm === "function") {
            checkAlarm(formattedTime);
        }
    }
}

sendTime();

setInterval(sendTime, 1000);
