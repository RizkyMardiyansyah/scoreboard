// @/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import stopwatchReducer from "./slices/stopwatchSlice";

const store = configureStore({
  reducer: {
    stopwatch: stopwatchReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable only in development
});

export default store;
