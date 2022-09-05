import { request } from "../configs/axios"

export const fetchProjectCategoryApi = () => {
    return request({
        url: `/ProjectCategory`,
        method: "GET",

    })
}