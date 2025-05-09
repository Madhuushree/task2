// DOM Elements
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Timer variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Format time as HH:MM:SS.MS
function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 12).replace('.', ':');
}

// Update the display
function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the timer
function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
}

// Pause the timer
function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

// Reset the timer
function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay();
  lapsContainer.innerHTML = '';
}

// Record a lap
function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.textContent = 'Lap ${lapsContainer.children.length + 1}: ${lapTime}';
    lapsContainer.prepend(lapElement);
  }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);