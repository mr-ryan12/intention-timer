class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  countdown() {
    interval = setInterval(decrement, 1000);
  }

  markComplete() {
    if (totalSeconds === 0) {
      this.completed = true;
    }
  }
  
  saveToStorage() {
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
}
