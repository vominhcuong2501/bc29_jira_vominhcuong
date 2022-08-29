import { AUTHORIZATION, BASE_URL } from "../constans/common"
import axios from "axios"

export const fetchUserLogin = (data) => {
    return axios({
        url: `${BASE_URL}/Users/signin`,
        method: "POST",
        data: data
    })
}

export const fetchUserRegister = (data) => {
    return axios({
        url: `${BASE_URL}/Users/signup`,
        method: "POST",
        data: data
    })
}

export const getUserApi = (keyWord) => {
    return axios({
        url: `${BASE_URL}/Users/getUser?keyword=${keyWord}`,
        method: "GET",
        headers: AUTHORIZATION

    })
}


export const removeUserProjectApi = (userDelete) => {
    return axios({
        url: `${BASE_URL}/Project/removeUserFromProject`,
        method: "POST",
        data: userDelete,
        headers: AUTHORIZATION

    })
}
