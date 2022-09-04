import { EDIT_USER, GET_USER, GET_USER_BY_PROJECT, GET_USER_LIST, SET_USER_INFO } from "../types/userType";

export const setUserAction = (values) => {
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

export const setUserEditAction = (userEdit) => {
    return {
        type: EDIT_USER,
        payload: userEdit
    }
}