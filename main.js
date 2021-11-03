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

window.addEventListener('load', preventMinutesE);
window.addEventListener('load', preventSecondsE);
studyButton.addEventListener('click', toggleStudyButtonColor);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);
startActivityButton.addEventListener('click', checkForNumbers);

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

function checkForNumbers(event) {
  event.preventDefault();
  if ((minutesInput.value === '') || (secondsInput.value === '') || (accomplishInput.value === '')) {
    displayErrorMessage();
  }
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
    var invalidChars = ['e', '-'];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}