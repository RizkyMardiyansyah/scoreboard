import React, { useState, useEffect } from "react";

const Stopwatch = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime || 0);
  const [isRunning, setIsRunning] = useState(false);

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
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    localStorage.setItem("stopwatchIsRunning", "true");
  };

  const pauseTimer = () => {
    setIsRunning(false);
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem("stopwatchTime");
    localStorage.removeItem("stopwatchIsRunning");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "black" }}>
        <span>{formatTime(time)}</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Stopwatch;
