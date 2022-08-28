import { GET_USER, SET_USER_INFO } from "../types/userType";

export const signinAction = (values) => {
    return {
        type: SET_USER_INFO,
        payload: values
    }
}

export const getUserAction = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}