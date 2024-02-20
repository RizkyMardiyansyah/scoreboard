import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stopTime, setStopTime] = useState(90 * 60);
  const stopwatchTime = localStorage.getItem("stopwatchTime");

  useEffect(() => {
    const storedTime = localStorage.getItem("stopwatchTime");
    const storedIsRunning = localStorage.getItem("stopwatchIsRunning");

    if (storedTime) {
      setTime(parseInt(storedTime, 10));
    }

    if (storedIsRunning) {
      setIsRunning(storedIsRunning === "true");
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("stopwatchTime", newTime);

          // Check if the time has reached the stop time
          if (newTime == stopTime) {
            pauseTimer();
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, stopTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const pauseTimer = () => {
    setIsRunning(false);
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        id="reset-btn"
        style={{
          fontSize: "70px",
          opacity: parseInt(stopwatchTime) === 5400 ? 0 : 1,
        }}
      >
        <span className="text-white">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Stopwatch;
