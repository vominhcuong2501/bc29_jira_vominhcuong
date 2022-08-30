import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { modalEditProjectReducer } from "./reducers/modalEditReducer";
import { projectReducer } from "./reducers/projectReducer";
import { taskReducer } from "./reducers/taskReducer";

// Object Literals
const rootReducer = combineReducers({
  userReducer, modalEditProjectReducer, projectReducer, taskReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

