// store.js

import { createStore } from "redux";
import rootReducer from "./reducers"; // Your combined reducers

const store = createStore(
  rootReducer
  // Apply middleware if needed
);

export default store;
