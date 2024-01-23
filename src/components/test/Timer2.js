// Stopwatch.js
import React from "react";
import { connect } from "react-redux";
import {
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  updateStopwatchTime,
} from "../../redux/action/action";

const Stopwatch = ({
  isRunning,
  time,
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  updateStopwatchTime,
}) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleStart = () => {
    startStopwatch();
    // Add any necessary logic to handle timer start
  };

  const handlePause = () => {
    pauseStopwatch();
    // Add any necessary logic to handle timer pause
  };

  const handleReset = () => {
    resetStopwatch();
    // Add any necessary logic to handle timer reset
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "white" }}>
        <span>{formatTime(time)}</span>
      </div>
      {!isRunning ? (
        <button style={{ color: "white" }} onClick={handleStart}>
          Start
        </button>
      ) : (
        <button style={{ color: "white" }} onClick={handlePause}>
          Pause
        </button>
      )}
      <button style={{ color: "white" }} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isRunning: state.isRunning,
  time: state.time,
});

const mapDispatchToProps = {
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  updateStopwatchTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
