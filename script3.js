let timerInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
  const startStopButton = document.getElementById('startStop');

  if (startStopButton.innerHTML === 'Start') {
    startTimer();
    startStopButton.innerHTML = 'Pause';
  } else {
    pauseTimer();
    startStopButton.innerHTML = 'Start';
  }
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById('timer').innerHTML = '00:00:00';
  elapsedTime = 0;
  laps = [];
  updateLaps();
  document.getElementById('startStop').innerHTML = 'Start';
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('timer').innerHTML = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsFormatted).padStart(2, '0')}`;
}

function lap() {
  const lapTime = elapsedTime;
  laps.push(formatTime(lapTime));
  updateLaps();
}

function updateLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.innerHTML = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}
