let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const lapsContainer = document.getElementById("laps");

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  let ms = Math.floor((time % 1000) / 10);

  return '${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}';
}

function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = timeToString(elapsedTime);
  }, 10);
}

function pauseTimer() {
  if (!isRunning) return;
  
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsContainer.innerHTML = '';
}

function recordLap() {
  if (!isRunning || elapsedTime === 0) return;
  
  const lapTime = timeToString(elapsedTime);
  const lapCount = lapsContainer.children.length + 1;
  const lapElement = document.createElement("div");
  lapElement.textContent = 'Lap ${lapCount}: ${lapTime}';
  lapsContainer.prepend(lapElement);
}