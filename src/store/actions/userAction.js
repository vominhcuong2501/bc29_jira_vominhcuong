import { GET_USER, GET_USER_BY_PROJECT, GET_USER_LIST, SET_USER_INFO } from "../types/userType";

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

export const getUserListAction = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data
    }
} 

export const getUserByProjectAction = (data) => {
    return {
        type: GET_USER_BY_PROJECT,
        payload: data
    }
}