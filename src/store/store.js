import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { modalEditProjectReducer } from "./reducers/modalEditReducer";
import { projectReducer } from "./reducers/projectReducer";
// Object Literals
const rootReducer = combineReducers({
  userReducer, modalEditProjectReducer, projectReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

