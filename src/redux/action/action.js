// actions.js
export const startStopwatch = () => ({ type: "START_STOPWATCH" });
export const pauseStopwatch = () => ({ type: "PAUSE_STOPWATCH" });
export const resetStopwatch = () => ({ type: "RESET_STOPWATCH" });
export const updateStopwatchTime = (newTime) => ({
  type: "UPDATE_STOPWATCH_TIME",
  payload: newTime,
});
