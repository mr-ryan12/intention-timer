// Variables targeting HTML button elements
var startTimer = document.querySelector('#start-timer');
var studyButton = document.querySelector('#study-button');
var leftButtons = document.querySelector('#left-buttons');
var errorMessage = document.querySelector('#error-message');
var logActivityButton = document.querySelector('#log-activity');
var meditateButton = document.querySelector('#meditate-button');
var exerciseButton = document.querySelector('#exercise-button');
var startActivityButton = document.querySelector('#start-button');
var createNewActivityButton = document.querySelector('#create-new-activity');

// Variables targeting HTML input elements
var minutesInput = document.querySelector('#minutes-input');
var secondsInput = document.querySelector('#seconds-input');
var accomplishInput = document.querySelector('#accomplish-input');

// Variables targeting view elements
var activityStatus = document.querySelector('#new-activity');
var timerView = document.querySelector('#timer-sub-container');
var timerCountdown = document.querySelector('#timer-countdown');
var haventLoggedMessage = document.querySelector('#havent-logged');
var completeFormMessage = document.querySelector('#complete-form');
var leftSubContainer = document.querySelector('#left-sub-container');
var activityDescription = document.querySelector('#activity-description');
var cardsHolder = document.querySelector('#past-activities-cards-holder');

// Variables to persist information in the Data Model
var interval;
var totalSeconds;
var displayMinutes;
var displaySeconds;
var currentActivity;
var activitiesArray;
var categorySelection;
var loggedActivities = [];

// Event listeners
window.addEventListener('load', displayOnLoad);
window.addEventListener('load', preventMinutesE);
window.addEventListener('load', preventSecondsE);
studyButton.addEventListener('click', toggleStudyButtonColor);
startActivityButton.addEventListener('click', checkForInputs);
createNewActivityButton.addEventListener('click', returnHome);
logActivityButton.addEventListener('click', storeCurrentActivity);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);
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
  assignCategory();
  if ((!categorySelection) || (minutesInput.value === '') || (secondsInput.value === '') || (accomplishInput.value === '')) {
    error(minutesInput);
    error(secondsInput);
    error(accomplishInput);
    buttonsError();
  } else {
    createDataModel();
    assignTimer();
    toggleTimerView();
  }
}

function buttonsError() {
  if (!(meditateButton.classList.contains('meditate-button-active')) &&
      !(studyButton.classList.contains('study-button-active')) &&
      !(exerciseButton.classList.contains('exercise-button-active'))) {
      
      displayErrorMessage();
      leftButtons.classList.add('left-buttons-border');
    }
  }

function error(input) {
  if (input.value === '') {
  displayErrorMessage();
  input.classList.add('error-bottom-border');
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
    categorySelection = 'Study';
  } else if (meditateButton.classList.contains('meditate-button-active')) {
    categorySelection = 'Meditate';
  } else if (exerciseButton.classList.contains('exercise-button-active')) {
    categorySelection = 'Exercise';
  }
}

function createDataModel() {
  currentActivity = new Activity(categorySelection, accomplishInput.value, minutesInput.value, secondsInput.value);
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
    ensureDoubleZeros();
    if (totalSeconds === 0) {
      show(logActivityButton);
      clearInterval(interval);
      displayComplete();
      timerAtZero();
    } else {
      timerCountdown.innerText = `${displayMinutes}:${displaySeconds}`;
    }
  }
}

function displayComplete() {
  startTimer.innerText = "COMPLETE!";
}

function timerAtZero() {
  timerCountdown.innerText = "00:00";
}

function logActivity() {
  hidePastActivityMessages();
  saveActivities();
}

function logActivity() {
  storeCurrentActivity();
  displayLocalStorage();
  hidePastActivityMessages();
  saveActivities();
}

function hidePastActivityMessages () {
  haventLoggedMessage.classList.add('hidden');
  completeFormMessage.classList.add('hidden');
}

function saveActivities() {
  loggedActivities.push(currentActivity);
  displayLoggedActivities();
}

function hideTimer() {
  hide(activityDescription);
  hide(timerCountdown);
  hide(startTimer);
  hide(logActivityButton);
  show(createNewActivityButton);
  show(cardsHolder);
  hide(haventLoggedMessage);
  hide(completeFormMessage);
  updateActivityStatus("Completed Activity");
}

function updateActivityStatus(newStatus) {
  activityStatus.innerText = newStatus;
}

function returnHome() {
  location.reload();
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function storeCurrentActivity() {
  if (localStorage.getItem('activitiesArray')) {
    loggedActivities = JSON.parse(localStorage.getItem('activitiesArray'));
    loggedActivities.unshift(currentActivity);
    displayLoggedActivities();
    hideTimer();
    activitiesArray = JSON.stringify(loggedActivities);
    localStorage.removeItem('activitiesArray');
    localStorage.setItem('activitiesArray', activitiesArray);
  } else {
    loggedActivities.unshift(currentActivity);
    displayLoggedActivities();
    hideTimer();
    activitiesArray = JSON.stringify(loggedActivities);
    localStorage.setItem('activitiesArray', activitiesArray);
  }
}

function displayOnLoad() {
  if (localStorage.getItem('activitiesArray')) {
    hide(haventLoggedMessage);
    hide(completeFormMessage);
    loggedActivities = JSON.parse(localStorage.getItem('activitiesArray'));
    displayLoggedActivities();
  }
}

function displayLoggedActivities() {
  var color;
  cardsHolder.innerHTML = ``;

  for (var i = 0; i < loggedActivities.length; i++) {
    if (loggedActivities[i].category === 'Meditate') {
      color = "#C278FD";
    } else if (loggedActivities[i].category === 'Study') {
      color = "#B3FD78";
    } else if (loggedActivities[i].category === 'Exercise') {
      color = "#FD8078";
    }

    cardsHolder.innerHTML += `
    <section class="past-activities-card" id="${loggedActivities[i].id}">
    <section class="card-words-holder" id="card-words-holder">
      <p class="past-activity-title" id="past-activity-title">${loggedActivities[i].category}</p>
      <h2 class="past-activity-time" id="past-activity-time">${loggedActivities[i].minutes} MIN ${loggedActivities[i].seconds} SECONDS</h2>
      <h3 class="past-activity-desciption" id="past-activity-description">${loggedActivities[i].description}</h3>
    </section>
    <hr style="color:${color}"></hr>
  </section>`
  }
}
