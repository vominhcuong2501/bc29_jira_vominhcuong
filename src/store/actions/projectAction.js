import {GET_ALL_PROJECT, GET_PROJECT_DETAIL, GET_PROJECT_EDIT, GET_TABLE, UPDATE_TABLE} from "../types/projectType"


export const getProjectEditAction = (data) => {
    return ({
        type: GET_PROJECT_EDIT,
        payload: data
    })
}

export const getTableAction = (table) => {
    return ({
        type: GET_TABLE,
        payload: table
    })
}

export const setTableAction = (updateTable) => {
    return ({
        type: UPDATE_TABLE,
        payload: updateTable
    })
}

export const getProjectDetailAction = (data) => {
    return ({
        type: GET_PROJECT_DETAIL,
        payload: data
    })
}

export const getAllProjectAction = (table) => {
    return ({
        type: GET_ALL_PROJECT,
        payload: table
    })
}


