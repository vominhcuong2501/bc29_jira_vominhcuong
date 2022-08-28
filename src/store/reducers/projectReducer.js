import { GET_PROJECT_DETAIL} from "../types/projectType";

const DEFAULT_STATE = {
    projectEdit: {},
};

export const projectReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROJECT_DETAIL: {
            return { ...state, projectEdit: payload }
        }

        default:
            return { ...state };
    }
};