// Variables targeting HTML button elements
var studyButton = document.querySelector('#studyButton');
var leftButtons = document.querySelector('#leftButtons');
var errorMessage = document.querySelector('#errorMessage');
var startTimerButton = document.querySelector('#startTimer');
var logActivityButton = document.querySelector('#logActivity');
var meditateButton = document.querySelector('#meditateButton');
var exerciseButton = document.querySelector('#exerciseButton');
var startActivityButton = document.querySelector('#startButton');
var createNewActivityButton = document.querySelector('#createNewActivity');

// Variables targeting HTML input elements
var minutesInput = document.querySelector('#minutesInput');
var secondsInput = document.querySelector('#secondsInput');
var accomplishInput = document.querySelector('#accomplishInput');

// Variables targeting view elements
var activityStatus = document.querySelector('#newActivity');
var timerView = document.querySelector('#timerSubContainer');
var timerCountdown = document.querySelector('#timerCountdown');
var haventLoggedMessage = document.querySelector('#haventLogged');
var completeFormMessage = document.querySelector('#completeForm');
var leftSubContainer = document.querySelector('#leftSubContainer');
var activityDescription = document.querySelector('#activityDescription');
var cardsHolder = document.querySelector('#pastActivitiesCardsHolder');

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
window.addEventListener('load', preventE(minutesInput));
window.addEventListener('load', preventE(secondsInput));
studyButton.addEventListener('click', toggleStudyButtonColor);
startActivityButton.addEventListener('click', checkForInputs);
createNewActivityButton.addEventListener('click', returnHome);
logActivityButton.addEventListener('click', storeCurrentActivity);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);
startTimerButton.addEventListener('click', startTimer);

function storeCurrentActivity() {
  currentActivity.saveToStorage();
}

function startTimer() {
  currentActivity.countdown();
}

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

      show(errorMessage);
      leftButtons.classList.add('left-buttons-border');
  }
}

function error(input) {
  if (input.value === '') {
    show(errorMessage);
    input.classList.add('error-bottom-border');
  }
}

function toggleTimerView() {
  timerView.classList.remove('hidden');
  leftSubContainer.classList.add('hidden');
  displayTimerColor();
  activityStatus.innerText = 'Current Activity';
}

function preventE(element) {
  element.addEventListener("keydown", function(e) {
    var invalidChars = 'e';
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  })
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
    startTimerButton.classList.add('start-timer-study');
  } else if (categorySelection === 'Meditate') {
    startTimerButton.classList.add('start-timer-meditate');
  } else if (categorySelection === 'Exercise') {
    startTimerButton.classList.add('start-timer-exercise');
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
    displayAtZeroSeconds()
  }
}

function displayAtZeroSeconds() {
  if (totalSeconds === 0) {
    show(logActivityButton);
    clearInterval(interval);
    displayComplete();
    timerAtZero();
    currentActivity.markComplete();
  } else {
    timerCountdown.innerText = `${displayMinutes}:${displaySeconds}`;
  }
}

function displayComplete() {
  startTimerButton.innerText = "COMPLETE!";
}

function timerAtZero() {
  timerCountdown.innerText = "00:00";
}

function hideTimer() {
  hide(activityDescription);
  hide(timerCountdown);
  hide(startTimerButton);
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
      <section class="card-words-holder">
        <p class="past-activity-title">${loggedActivities[i].category}</p>
        <h2>${loggedActivities[i].minutes} MIN ${loggedActivities[i].seconds} SECONDS</h2>
        <h3>${loggedActivities[i].description}</h3>
      </section>
      <hr style="color:${color}"></hr>
    </section>`
  }
}
