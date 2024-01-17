// components/StopwatchContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const StopwatchContext = createContext();

export const useStopwatch = () => {
  return useContext(StopwatchContext);
};

export const StopwatchProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Load saved state from local storage on component mount
    const savedElapsedTime =
      parseInt(localStorage.getItem("elapsedTime"), 10) || 0;
    const savedIsRunning =
      JSON.parse(localStorage.getItem("isRunning")) || false;

    setElapsedTime(savedElapsedTime);
    setIsRunning(savedIsRunning);
  }, []);

  useEffect(() => {
    // Save state to local storage on changes
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
  }, [elapsedTime, isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const value = {
    elapsedTime,
    isRunning,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  };

  return (
    <StopwatchContext.Provider value={value}>
      {children}
    </StopwatchContext.Provider>
  );
};
