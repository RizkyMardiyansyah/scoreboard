import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
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

  const handleStartFromZero = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.setItem("stopwatchTime", "0");
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const handleStartFrom45 = () => {
    setIsRunning(false);
    setTime(45 * 60); // 45 minutes in seconds
    localStorage.setItem("stopwatchTime", String(45 * 60));
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "black" }}>
        <span>{formatTime(time)}</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={handleStartFromZero}>Start from 0</button>
      <button onClick={handleStartFrom45}>Start from 45</button>
    </div>
  );
};

export default Stopwatch;
