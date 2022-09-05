import { request } from "../configs/axios"

export const fetchGetCommentApi = (taskId) => {
    return request({
        url: `/Comment/getAll?taskId=${taskId}`,
        method: "GET"
    })
}

export const fetchCommentApi = (data) => {
    return request({
        url: `/Comment/insertComment`,
        method: "POST",
        data: data,
    })
}

export const fetchDeleteCommentApi = (commentId) => {
    return request({
        url: `/Comment/deleteComment?idComment=${commentId}`,
        method: "DELETE",
    })
}

export const fetchUpdateCommentApi = (commentId, content) => {
    return request({
        url: `/Comment/updateComment?id=${commentId}&contentComment=${content}`,
        method: "PUT",
    })
}

