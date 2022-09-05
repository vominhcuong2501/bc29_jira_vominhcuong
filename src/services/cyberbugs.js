import { request } from "../configs/axios"

export const fetchGetStatusApi = () => {
    return request({
        url: `/Status/getAll`,
        method: "GET",
    })
}

export const fetchGetPriorityApi = () => {
    return request({
        url: `/Priority/getAll`,
        method: "GET",
    })
}

export const fetchGetTaskTypeApi = () => {
    return request({
        url: `/TaskType/getAll`,
        method: "GET",
    })
}