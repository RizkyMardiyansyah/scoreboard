// context/StopwatchContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useStopwatch as useTimerHook } from "react-timer-hook";

const StopwatchContext = createContext();

export const StopwatchProvider = ({ children }) => {
  const { seconds, minutes, isRunning, start, pause, reset } = useTimerHook({
    autoStart: false,
  });

  const [timerState, setTimerState] = useState({
    seconds,
    minutes,
    isRunning,
  });

  useEffect(() => {
    setTimerState({ seconds, minutes, isRunning });
  }, [seconds, minutes, isRunning]);

  const toggleIsRunning = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const resetTimer = () => {
    reset();
  };

  return (
    <StopwatchContext.Provider
      value={{ timerState, toggleIsRunning, resetTimer }}
    >
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
