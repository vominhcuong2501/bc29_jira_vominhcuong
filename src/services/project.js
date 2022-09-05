import { request } from "../configs/axios"

export const fetchCreateProjectAuthorizeApi = newProject => {
    return request({
        url: `/Project/createProjectAuthorize`,
        method: "POST",
        data: newProject,
    })
}

export const fetchGetAllProjectApi = () => {
    return request({
        url: `/Project/getAllProject`,
        method: "GET",
    })
}

export const fetchDeleteProjectApi = (id) => {
    return request({
        url: `/Project/deleteProject?projectId=${id}`,
        method: "DELETE",
    })
}

export const fetchGetProjectDetailApi = (id) => {
    return request({
        url: `/Project/getProjectDetail?id=${id}`,
        method: "GET",
    })
}

export const fetchUpdateProjectApi = (projectUpdate) => {
    return request({
        url: `/Project/updateProject?projectId=${projectUpdate.id}`,
        method: "PUT",
        data: projectUpdate,

    })
}

export const assignUserProjectApi = (userProject) => {
    return request({
        url: `/Project/assignUserProject`,
        method: "POST",
        data: userProject,
    })
}



