// hooks/useStopwatchManager.js
import { useEffect, useState } from "react";
import StopwatchManager from "../utils/StopwatchManager";

const useStopwatchManager = () => {
  const [stopwatchState, setStopwatchState] = useState({
    elapsedTime: StopwatchManager.elapsedTime,
    isRunning: StopwatchManager.isRunning,
  });

  useEffect(() => {
    const handleChange = (newState) => {
      setStopwatchState(newState);
    };

    StopwatchManager.subscribe(handleChange);

    return () => {
      StopwatchManager.unsubscribe(handleChange);
    };
  }, []);

  return {
    ...stopwatchState,
    startStopwatch: StopwatchManager.startStopwatch.bind(StopwatchManager),
    stopStopwatch: StopwatchManager.stopStopwatch.bind(StopwatchManager),
    resetStopwatch: StopwatchManager.resetStopwatch.bind(StopwatchManager),
  };
};

export default useStopwatchManager;
