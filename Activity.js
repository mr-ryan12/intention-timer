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
  };

  markComplete() {
    logActivity()

  };
  saveToStorage() {};
}
