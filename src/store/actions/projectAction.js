import {GET_PROJECT_DETAIL, GET_TABLE, UPDATE_TABLE } from "../types/projectType"


export const getProjectDetail = (data) => {
    return ({
        type: GET_PROJECT_DETAIL,
        payload: data
    })
}

export const getTableAction = (table) => {
    return ({
        type: GET_TABLE,
        payload: table
    })
}

export const getUpdateTableAction = (table,projectUpdate) => {
    return ({
        type: UPDATE_TABLE,
        payload: table,projectUpdate
    })
}