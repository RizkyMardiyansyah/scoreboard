// StopwatchContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const StopwatchContext = createContext();

export const StopwatchProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000); // Increment elapsed time every 1 second
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleStopwatch = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const values = {
    seconds: elapsedTime % 60,
    minutes: Math.floor((elapsedTime / 60) % 60),
    hours: Math.floor(elapsedTime / 3600),
    isRunning,
    toggleStopwatch,
    resetStopwatch,
  };

  return (
    <StopwatchContext.Provider value={values}>
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error("useStopwatch must be used within a StopwatchProvider");
  }
  return context;
};
