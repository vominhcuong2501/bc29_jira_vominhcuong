import axios from "axios"
import { ACCESS_TOKEN, BASE_URL } from "../constans/common"

export const fetchCreateProjectAuthorizeApi = newProject => {
    console.log(localStorage.getItem(ACCESS_TOKEN));
    return axios({
        url: `${BASE_URL}/Project/createProjectAuthorize`,
        method: "POST",
        data: newProject,
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN).replace(/['"]+/g, '')}`}
    })
}

export const fetchGetAllProjectApi = () => {
    return axios({
        url: `${BASE_URL}/Project/getAllProject`,
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN).replace(/['"]+/g, '')}`}
    })
}