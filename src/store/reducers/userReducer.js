import { USER_LOGIN_KEY } from "../../constans/common";
import { GET_USER, SET_USER_INFO } from "../types/userType";

// store reducer
let userInfo = localStorage.getItem(USER_LOGIN_KEY);

if (userInfo) {
  userInfo = JSON.parse(userInfo);
}

const DEFAULT_STATE = {
  userInfo: userInfo,
  userSearch: []
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO: {
      state.userInfo = payload;
      return { ...state };
    }
    
    case GET_USER: {
      return {...state, userSearch: payload}
    }
    default:
      return { ...state };
  }
};