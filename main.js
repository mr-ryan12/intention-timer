//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var startActivityButton = document.querySelector('.start-button');
var errorMessage = document.querySelector('.error-message');
var startTimer = document.querySelector('.start-timer');
var logActivityButton = document.querySelector('.log-activity');

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
var haventLoggedMessage = document.querySelector('.havent-logged')
var completeFormMessage = document.querySelector('.complete-form')
var pastActivityCard = document.querySelector('.past-activities-card')

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
logActivityButton.addEventListener('click', logActivity)


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
  assignCategory();
  if ((!categorySelection) || (minutesInput.value === '') || (secondsInput.value === '') || (accomplishInput.value === '')) {
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
  currentActivity = new Activity(categorySelection, accomplishInput.value, minutesInput.value, secondsInput.value)
  totalSeconds = (parseInt(currentActivity.seconds) + (parseInt(currentActivity.minutes * 60)));
  displayMinutes = Math.floor(totalSeconds / 60);
  displaySeconds = totalSeconds % 60;
  ensureDoubleZeros(); 
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
  } else if (categorySelection === 'Exercise') {
    startTimer.classList.add('start-timer-exercise');
  }
}

function ensureDoubleZeros() {
  if (displayMinutes < 10) {
    displayMinutes = "0" + Math.floor(totalSeconds / 60);
  }
  if (displaySeconds < 10) {
    displaySeconds = "0" + (totalSeconds % 60);
  }
}

function decrement() {
  if (totalSeconds > 0) {
    totalSeconds--;
    displayMinutes = Math.floor(totalSeconds / 60);
    displaySeconds = totalSeconds % 60;
    ensureDoubleZeros()
    if (totalSeconds === 0) {
      clearInterval(interval);
      displayComplete();
      timerAtZero();
    } else {
      timerCountdown.innerText = `${displayMinutes}:${displaySeconds}`;
    }
  }
}

function displayComplete() {
  startTimer.innerText = "COMPLETE!"
}

function timerAtZero() {
  timerCountdown.innerText = "00:00"
}

function logActivity() {
  hidePastActivityMessages(); 
  saveActivities();
}

//goal: log our last instance of the data model as a past activity card
// event listener on log activity button
// hide past activity message, show cards
// push current activity to array
// invoke function which iterates through array and displays all elements as cards
/////// for loop, for each i, += innerHTML 

function hidePastActivityMessages () {
  haventLoggedMessage.classList.add('hidden')
  completeFormMessage.classList.add('hidden')
  pastActivityCard.classList.remove('hidden')
}

var loggedActivities = [] 

function saveActivities() {
  loggedActivities.push(currentActivity)
  displayLoggedActivities();
}

var cardWordsHolder = document.querySelector('.card-words-holder')

function displayLoggedActivities() {
  cardWordsHolder.innerHTML = ``
  for (var i = 0; i < loggedActivities.length; i++) {
    cardWordsHolder.innerHTML = `<p class="past-activity-title" id="past-activity-title">${loggedActivities[i].category}</p>
    <h2 class="past-activity-time" id="past-activity-time">${loggedActivities[i].minutes} MIN ${loggedActivities[i].seconds} SECONDS</h2>
    <h3 class="past-activity-desciption" id="past-activity-description">${loggedActivities[i].description}</h3>`
  }
}