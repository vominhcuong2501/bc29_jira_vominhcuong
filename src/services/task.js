import { request } from "../configs/axios"

export const fetchCreateTaskApi = (data) => {
    return request({
        url: `/Project/createTask`,
        method: "POST",
        data: data,

    })
}
export const fetchTaskDetailApi = (taskId) => {
    return request({
        url: `/Project/getTaskDetail?taskId=${taskId}`,
        method: "GET",
        data: taskId,
    })
}

export const fetchUpdateStatusApi = (status) => {
    return request({
        url: `/Project/updateStatus`,
        method: "PUT",
        data: status,

    })
}
export const fetchUpdatePriorityApi = (priority) => {
    return request({
        url: `/Project/updatePriority`,
        method: "PUT",
        data: priority,

    })
}
export const fetchUpdateDesciptionApi = (desciption) => {
    return request({
        url: `/Project/updateDescription`,
        method: "PUT",
        data: desciption,

    })
}
export const fetchUpdateTimeTrackingApi = (timeTracking) => {
    return request({
        url: `/Project/updateTimeTracking`,
        method: "PUT",
        data: timeTracking,

    })
}
export const fetchUpdateEstimateApi = (estimate) => {
    return request({
        url: `/Project/updateEstimate`,
        method: "PUT",
        data: estimate,

    })
}

export const fetchUpdateTaskDetailApi = (data) => {
    return request({
        url: `/Project/updateTask`,
        method: "POST",
        data: data,

    })
}

export const fetchRemoveTaskApi = (taskId) => {
    return request({
        url: `/Project/removeTask?taskId=${taskId}`,
        method: "DELETE",

    })
}