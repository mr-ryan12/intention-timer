//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var startActivityButton = document.querySelector('.start-button');

//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.second-input');

studyButton.addEventListener('click', toggleStudyButtonColor);
meditateButton.addEventListener('click', toggleMeditateButtonColor);
exerciseButton.addEventListener('click', toggleExerciseButtonColor);

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