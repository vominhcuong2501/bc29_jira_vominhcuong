import axios from "axios"
import { AUTHORIZATION, BASE_URL } from "../constans/common"

export const fetchGetCommentApi = (taskId) => {
    return axios({
        url: `${BASE_URL}/Comment/getAll?taskId=${taskId}`,
        method: "GET"
    })
}

export const fetchCommentApi = (data) => {
    return axios({
        url: `${BASE_URL}/Comment/insertComment`,
        method: "POST",
        data: data,
        headers: AUTHORIZATION
    })
}

export const fetchDeleteCommentApi = (commentId) => {
    return axios({
        url: `${BASE_URL}/Comment/deleteComment?idComment=${commentId}`,
        method: "DELETE",
        headers: AUTHORIZATION
    })
}

export const fetchUpdateCommentApi = (commentId, content) => {
    return axios({
        url: `${BASE_URL}/Comment/updateComment?id=${commentId}&contentComment=${content}`,
        method: "PUT",
        headers: AUTHORIZATION
    })
}

