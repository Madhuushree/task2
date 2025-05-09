let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const lapsContainer = document.getElementById("laps");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function formatTime(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  let ms = Math.floor((time % 1000) / 10);

  return ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')};
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
});

resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsContainer.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning && elapsedTime > 0) {
    const lapTime = formatTime(elapsedTime);
    const lapCount = lapsContainer.children.length + 1;
    const lapElement = document.createElement("div");
    lapElement.textContent = 'Lap ${lapCount}: ${lapTime}';
    lapsContainer.prepend(lapElement);
  }
});