//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var startActivityButton = document.querySelector('.start-button');
var errorMessage = document.querySelector('.error-message');

//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');

//views
var timerView = document.querySelector('.timer-sub-container')
var leftSubContainer = document.querySelector('.left-sub-container')

//data model
var categorySelection;
var currentActivity;

var activityDescription = document.querySelector('.activity-description')

// if (studyButton.classList.contains('study-button-active')) {
//   activity.category= "study"
// }



window.addEventListener('load', preventMinutesE);
window.addEventListener('load', preventSecondsE);
studyButton.addEventListener('click', toggleStudyButtonColor);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);
startActivityButton.addEventListener('click', checkForInputs);

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
  } else {
    createDataModel();
    console.log(currentActivity)
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
  timerView.classList.remove('hidden')
  leftSubContainer.classList.add('hidden')
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
  currentActivity = new Activity(categorySelection, accomplishInput.value, minutesInput.value, secondsInput.value,)
}

function assignTimer() {
  activityDescription.innerText = `${currentActivity.description}`
}
