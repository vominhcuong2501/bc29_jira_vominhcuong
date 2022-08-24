import { SET_USER_INFO } from "../types/userType";




export const signinAction = (values) => {
    return {
        type: SET_USER_INFO,
        payload: values
    }
}