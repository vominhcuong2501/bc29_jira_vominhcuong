import axios from "axios"
import { BASE_URL } from "../constans/common"

export const fetchProjectCategoryApi = () => {
    return axios({
        url: `${BASE_URL}/ProjectCategory`,
        method: "GET"
    })
}