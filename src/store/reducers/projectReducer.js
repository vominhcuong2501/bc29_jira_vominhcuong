import { GET_PROJECT_DETAIL } from "../types/projectType";

const DEFAULT_STATE = {
    projectEdit: {}
};

export const projectReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_PROJECT_DETAIL: {
            return { ...state, projectEdit: action.payload }
        }

        default:
            return { ...state };
    }
};