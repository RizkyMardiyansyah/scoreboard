// @/redux/slices/stopwatchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState: {
    isRunning: false,
    time: 0,
  },
  reducers: {
    startStopwatch: (state) => {
      state.isRunning = true;
    },
    pauseStopwatch: (state) => {
      state.isRunning = false;
    },
    resetStopwatch: (state) => {
      state.isRunning = false;
      state.time = 0;
    },
    updateStopwatchTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const {
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  updateStopwatchTime,
} = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
