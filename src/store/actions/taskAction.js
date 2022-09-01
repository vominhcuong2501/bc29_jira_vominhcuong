import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER, SELECTED_USER } from "../types/taskType"



export const selectedUserTaskAction = (data) => {
    return ({
        type: SELECTED_USER,
        payload: data
    })
}

export const getTaskDetailAction = (data) => {
    return ({
        type: GET_TASK_DETAIL,
        payload: data
    })
}

export const changeTaskModal = (value, name) => {
    return ({
        type: CHANGE_TASK_MODAL,
        name,
        value
    })
}

export const changeAssignessModal = (userSelected) => {
    return ({
        type: CHANGE_ASSIGNESS,
        payload: userSelected
    })
}

export const removeUserAssignessAction = (userId) => {
    return ({
        type: REMOVE_USER,
        payload: userId
    })
}