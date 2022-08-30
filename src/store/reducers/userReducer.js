import { USER_LOGIN_KEY } from "../../constans/common";
import { GET_USER, GET_USER_BY_PROJECT, SET_USER_INFO } from "../types/userType";

// store reducer
let userInfo = localStorage.getItem(USER_LOGIN_KEY);

if (userInfo) {
  userInfo = JSON.parse(userInfo);
}

const DEFAULT_STATE = {
  userInfo: userInfo,
  userSearch: [],
  userByProject: []
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

    case GET_USER_BY_PROJECT: {
      return {...state, userByProject: payload}
    }
    default:
      return { ...state };
  }
};