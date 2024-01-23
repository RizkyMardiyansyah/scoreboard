// reducers.js
const initialState = {
  isRunning: false,
  time: 0,
};

const stopwatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_STOPWATCH":
      return { ...state, isRunning: true };
    case "PAUSE_STOPWATCH":
      return { ...state, isRunning: false };
    case "RESET_STOPWATCH":
      return { ...state, isRunning: false, time: 0 };
    case "UPDATE_STOPWATCH_TIME":
      return { ...state, time: action.payload };
    default:
      return state;
  }
};

export default stopwatchReducer;
