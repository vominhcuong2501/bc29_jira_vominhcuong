import { BASE_URL } from "../constans/common"
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