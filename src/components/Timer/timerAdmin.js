import React, { useState, useEffect } from "react";

export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stopTime, setStopTime] = useState(90 * 60);

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
          if (newTime === stopTime) {
            pauseTimer();
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, stopTime]);

  const startTimer = () => {
    setIsRunning(true);
    localStorage.setItem("stopwatchIsRunning", "true");
  };

  const pauseTimer = () => {
    setIsRunning(false);
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const handleStartFromZero = () => {
    setIsRunning(false);
    setTime(0);
    // setTime(44 * 60 + 54);
    setStopTime(45 * 60);
    localStorage.setItem("stopwatchTime", String(0));
    // localStorage.setItem("stopwatchTime", String(44 * 60 + 54));
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const handleStartFrom45 = () => {
    setIsRunning(false);
    setTime(45 * 60);
    // setTime(89 * 60 + 54);
    setStopTime(90 * 60);
    localStorage.setItem("stopwatchTime", String(45 * 60));
    // localStorage.setItem("stopwatchTime", String(89 * 60 + 54));
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  return {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    handleStartFromZero,
    handleStartFrom45,
  };
};
