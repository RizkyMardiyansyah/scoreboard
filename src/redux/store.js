// store.js
import { createStore } from "redux";
import stopwatchReducer from "./reducers/reducer";

const store = createStore(stopwatchReducer);

export default store;
