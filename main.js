//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var startActivityButton = document.querySelector('.start-button');

//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.second-input');

studyButton.addEventListener('click', changeStudyButtonColor);
// meditateButton.addEventListener('click', changeColor);
// exerciseButton.addEventListener('click', changeColor);

function changeStudyButtonColor() {
  studyButton.style.background = "url('assets/study-active.svg')";
  studyButton.style.color = "#B3FD78";
  studyButton.style.backgroundRepeat = "no-repeat";
  studyButton.style.backgroundSize = "25px 25px";
  studyButton.style.backgroundPosition = "58px 10px";
  studyButton.style.height = "67px";
  studyButton.style.width = "142px";
  studyButton.style.border = "1px solid #B3FD78";
  studyButton.style.paddingLeft = "10px";
  studyButton.style.paddingRight = "10px";
  studyButton.style.paddingTop = "27px";
  studyButton.style.borderRadius = "5px 5px";
}