// components/Stopwatch.js
import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const startTime = localStorage.getItem("startTime");
    const savedElapsedTime = localStorage.getItem("elapsedTime");

    if (startTime && savedElapsedTime) {
      setElapsedTime(parseInt(savedElapsedTime, 10));
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;

      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    localStorage.setItem("startTime", Date.now());
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    localStorage.removeItem("startTime");
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    localStorage.setItem("startTime", Date.now());
    setElapsedTime(0);
  };

  return (
    <div>
      <div>Elapsed Time: {elapsedTime} milliseconds</div>
      <button onClick={startStopwatch} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopStopwatch} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
};

export default Stopwatch;
