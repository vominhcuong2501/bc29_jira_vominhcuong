import {GET_PROJECT_DETAIL} from "../types/projectType"


export const getProjectDetail = (data) => {
    return ({
        type: GET_PROJECT_DETAIL,
        payload: data
    })
}

