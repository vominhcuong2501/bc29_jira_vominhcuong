import {  request } from "../configs/axios"

export const fetchUserLogin = (data) => {
    return request({
        url: `/Users/signin`,
        method: "POST",
        data: data
    })
}


export const fetchUserRegister = (data) => {
    return request({
        url: `/Users/signup`,
        method: "POST",
        data: data
    })
}

export const getUserApi = (keyWord) => {
    return request({
        url: `/Users/getUser?keyword=${keyWord}`,
        method: "GET",
    })
}

export const getUserListApi = () => {
    return request({
        url: `/Users/getUser`,
        method: "GET",
    })
}

export const getUserDetailApi = (id) => {
    return request({
        url: `/Users/getUser?id=${id}`,
        method: "GET",
    })
}

export const removeUserProjectApi = (userDelete) => {
    return request({
        url: `/Project/removeUserFromProject`,
        method: "POST",
        data: userDelete,
    })
}

export const getUserByProjectApi = (projectId) => {
    return request({
        url: `/Users/getUserByProjectId?idProject=${projectId}`,
        method: "GET",
    })
}

export const fetchDeleteUserApi = (userId) => {
    return request({
        url: `/Users/deleteUser?id=${userId}`,
        method: "DELETE",
    })
}

export const fetchUpdateUserApi = (userUpdate) => {
    return request({
        url: `/Users/editUser`,
        method: "PUT",
        data: userUpdate
    })
}