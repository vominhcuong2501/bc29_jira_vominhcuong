import axios from "axios"
import { AUTHORIZATION, BASE_URL } from "../constans/common"

export const fetchCreateTaskApi = (data) => {
    return axios({
        url: `${BASE_URL}/Project/createTask`,
        method: "POST",
        data: data,
        headers: AUTHORIZATION

    })
}
export const fetchTaskDetailApi = (taskId) => {
    return axios({
        url: `${BASE_URL}/Project/getTaskDetail?taskId=${taskId}`,
        method: "GET",
        data: taskId,
        headers: AUTHORIZATION
    })
}