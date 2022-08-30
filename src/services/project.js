import axios from "axios"
import { AUTHORIZATION, BASE_URL } from "../constans/common"

export const fetchCreateProjectAuthorizeApi = newProject => {
    return axios({
        url: `${BASE_URL}/Project/createProjectAuthorize`,
        method: "POST",
        data: newProject,
        headers: AUTHORIZATION
    })
}

export const fetchGetAllProjectApi = () => {
    return axios({
        url: `${BASE_URL}/Project/getAllProject`,
        method: "GET",
        headers: AUTHORIZATION
    })
}

export const fetchDeleteProjectApi = (id) => {
    return axios({
        url: `${BASE_URL}/Project/deleteProject?projectId=${id}`,
        method: "DELETE",
        headers: AUTHORIZATION

    })
}

export const fetchGetProjectDetailApi = (id) => {
    return axios({
        url: `${BASE_URL}/Project/getProjectDetail?id=${id}`,
        method: "GET",
        headers: AUTHORIZATION
    })
}

export const fetchUpdateProjectApi = (projectUpdate) => {
    return axios({
        url: `${BASE_URL}/Project/updateProject?projectId=${projectUpdate.id}`,
        method: "PUT",
        data: projectUpdate,
        headers: AUTHORIZATION

    })
}

export const assignUserProjectApi = (userProject) => {
    return axios({
        url: `${BASE_URL}/Project/assignUserProject`,
        method: "POST",
        data: userProject,
        headers: AUTHORIZATION
    })
}



