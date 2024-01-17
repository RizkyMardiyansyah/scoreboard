// utils/Stopwatch.js
import firebase from "firebase/app";
import "firebase/database";

class Stopwatch {
  constructor() {
    this.database = firebase.database();
    this.stopwatchRef = this.database.ref("stopwatch");
  }

  startStopwatch() {
    this.stopwatchRef.update({ isRunning: true });
  }

  stopStopwatch() {
    this.stopwatchRef.update({ isRunning: false });
  }

  resetStopwatch() {
    this.stopwatchRef.update({ elapsedTime: 0, isRunning: false });
  }

  subscribe(callback) {
    this.stopwatchRef.on("value", (snapshot) => {
      const data = snapshot.val();
      callback({
        elapsedTime: data?.elapsedTime || 0,
        isRunning: data?.isRunning || false,
      });
    });
  }

  unsubscribe() {
    this.stopwatchRef.off();
  }
}

const instance = new Stopwatch();
export default instance;
