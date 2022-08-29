import axios from "axios"
import { AUTHORIZATION, BASE_URL } from "../constans/common"

export const fetchGetStatusApi = () => {
    return axios({
        url: `${BASE_URL}/Status/getAll`,
        method: "GET",

    })
}

export const fetchGetPriorityApi = () => {
    return axios({
        url: `${BASE_URL}/Priority/getAll`,
        method: "GET",

    })
}

export const fetchGetTaskTypeApi = () => {
    return axios({
        url: `${BASE_URL}/TaskType/getAll`,
        method: "GET",

    })
}