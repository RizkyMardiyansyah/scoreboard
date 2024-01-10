// reducers/stopwatchReducer.js

const initialState = {
  isRunning: false,
  elapsedTime: 0,
};

const stopwatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_STOPWATCH":
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    // Handle other actions like incrementing elapsed time
    default:
      return state;
  }
};

export default stopwatchReducer;
