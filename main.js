//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var startActivityButton = document.querySelector('.start-button');
var errorMessage = document.querySelector('.error-message');
var startTimer = document.querySelector('.start-timer');

//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');

//views
var timerView = document.querySelector('.timer-sub-container');
var leftSubContainer = document.querySelector('.left-sub-container');
var activityStatus = document.querySelector('.new-activity');
var activityDescription = document.querySelector('.activity-description');
var timerCountdown = document.querySelector('.timer-countdown');

//data model
var categorySelection;
var currentActivity;
var totalSeconds;
var displayMinutes;
var displaySeconds;
var interval;


window.addEventListener('load', preventMinutesE);
window.addEventListener('load', preventSecondsE);
studyButton.addEventListener('click', toggleStudyButtonColor);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);
startActivityButton.addEventListener('click', checkForInputs);
startTimer.addEventListener('click', function() {currentActivity.countdown()});



function toggleStudyButtonColor() {
  addStudyButtonColor();
  removeMeditateButtonColor();
  removeExerciseButtonColor();
}

function toggleMeditateButtonColor() {
  addMeditateButtonColor();
  removeStudyButtonColor();
  removeExerciseButtonColor();
}

function toggleExerciseButtonColor() {
  addExerciseButtonColor();
  removeStudyButtonColor();
  removeMeditateButtonColor();
}

function addStudyButtonColor() {
  studyButton.classList.add('study-button-active');
}

function removeStudyButtonColor() {
  studyButton.classList.remove('study-button-active');
}

function addMeditateButtonColor() {
  meditateButton.classList.add('meditate-button-active');
}

function removeMeditateButtonColor() {
  meditateButton.classList.remove('meditate-button-active');
}

function addExerciseButtonColor() {
  exerciseButton.classList.add('exercise-button-active');
}

function removeExerciseButtonColor() {
  exerciseButton.classList.remove('exercise-button-active');
}

function displayErrorMessage() {
  errorMessage.classList.remove('hidden');
}

function checkForInputs(event) {
  event.preventDefault();
  if ((minutesInput.value === '') || (secondsInput.value === '') || (accomplishInput.value === '')) {
    minutesError();
    secondsError();
    accomplishError();
    // checkButtonClick();
  } else {
    createDataModel();
    assignTimer();
    toggleTimerView();
  }
}

function minutesError() {
  if (minutesInput.value === '') {
  displayErrorMessage();
  minutesInput.classList.add('error-bottom-border')
  }
}

function secondsError() {
  if (secondsInput.value === '') {
  displayErrorMessage();
  secondsInput.classList.add('error-bottom-border')
  }
}

function accomplishError() {
  if (accomplishInput.value === '') {
  displayErrorMessage();
  accomplishInput.classList.add('error-bottom-border')
  }
}

function toggleTimerView() {
  timerView.classList.remove('hidden');
  leftSubContainer.classList.add('hidden');
  displayTimerColor();
  activityStatus.innerText = 'Current Activity';
}

function preventMinutesE() {
  minutesInput.addEventListener("keydown", function(e) {
    var invalidChars = 'e';
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}

function preventSecondsE() {
  secondsInput.addEventListener("keydown", function(e) {
    var invalidChars = 'e';
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}

function assignCategory() {
  if (studyButton.classList.contains('study-button-active')) {
    categorySelection = 'Study'
  } else if (meditateButton.classList.contains('meditate-button-active')) {
    categorySelection = 'Meditate'
  } else if (exerciseButton.classList.contains('exercise-button-active')) {
    categorySelection = 'Exercise'
  }
}

function createDataModel() {
  assignCategory();
  currentActivity = new Activity(categorySelection, accomplishInput.value, minutesInput.value, secondsInput.value)
  totalSeconds = (parseInt(currentActivity.seconds) + (parseInt(currentActivity.minutes * 60)));
  displayMinutes = Math.floor(totalSeconds / 60);
  displaySeconds = totalSeconds % 60;
  if (displaySeconds < 10) {
    displaySeconds = "0" + (totalSeconds % 60);
  }
  timerCountdown.innerText = `${displayMinutes}:${displaySeconds}`;
}

function assignTimer() {
  activityDescription.innerText = `${currentActivity.description}`;
}

function displayTimerColor() {
  if (categorySelection === 'Study') {
    startTimer.classList.add('start-timer-study');
  } else if (categorySelection === 'Meditate') {
    startTimer.classList.add('start-timer-meditate');
  } else if (ecategorySelection === 'Exercise') {
    startTimer.classList.add('start-timer-exercise');
  }
}

function decrement() {
  if (totalSeconds > 0) {
    totalSeconds--;
    displayMinutes = Math.floor(totalSeconds / 60);
    displaySeconds = totalSeconds % 60;
    if (displaySeconds < 10) {
      displaySeconds = "0" + (totalSeconds % 60);
    }
    if (totalSeconds === 0) {
      clearInterval(interval);
      displayComplete();
      timerAtZero();
    } else {
      timerCountdown.innerText = `${displayMinutes}:${displaySeconds}`;
    }
  }
}

function displayComplete () {
  startTimer.innerText = "COMPLETE!"
}

function timerAtZero () {
  timerCountdown.innerText = "00:00"
}