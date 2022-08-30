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

export const fetchUpdateStatusApi = (status) => {
    return axios({
        url: `${BASE_URL}/Project/updateStatus`,
        method: "PUT",
        data: status,
        headers: AUTHORIZATION

    })
}
export const fetchUpdatePriorityApi = (priority) => {
    return axios({
        url: `${BASE_URL}/Project/updatePriority`,
        method: "PUT",
        data: priority,
        headers: AUTHORIZATION

    })
}
export const fetchUpdateDesciptionApi = (desciption) => {
    return axios({
        url: `${BASE_URL}/Project/updateDescription`,
        method: "PUT",
        data: desciption,
        headers: AUTHORIZATION

    })
}
export const fetchUpdateTimeTrackingApi = (timeTracking) => {
    return axios({
        url: `${BASE_URL}/Project/updateTimeTracking`,
        method: "PUT",
        data: timeTracking,
        headers: AUTHORIZATION

    })
}
export const fetchUpdateEstimateApi = (estimate) => {
    return axios({
        url: `${BASE_URL}/Project/updateEstimate`,
        method: "PUT",
        data: estimate,
        headers: AUTHORIZATION

    })
}