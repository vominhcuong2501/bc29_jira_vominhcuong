import axios from "axios"
import { AUTHORIZATION, BASE_URL } from "../constans/common"

export const fetchProjectCategoryApi = () => {
    return axios({
        url: `${BASE_URL}/ProjectCategory`,
        method: "GET",
        headers: AUTHORIZATION

    })
}