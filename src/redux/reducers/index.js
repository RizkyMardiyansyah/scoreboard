// reducers/index.js

import { combineReducers } from "redux";
import stopwatchReducer from "./stopwatchReducer";

const rootReducer = combineReducers({
  stopwatch: stopwatchReducer,
  // Add other reducers if needed
});

export default rootReducer;
