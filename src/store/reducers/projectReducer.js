import { GET_PROJECT_DETAIL, GET_TABLE, UPDATE_TABLE } from "../types/projectType";

const DEFAULT_STATE = {
    projectEdit: {},
    table: []
};

export const projectReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROJECT_DETAIL: {
            return { ...state, projectEdit: payload }
        }

        case GET_TABLE: {
            return { ...state, table: payload }
        }

        case UPDATE_TABLE: {
            console.log(payload);
            return {...state, table: payload}
           
        }
        default:
            return { ...state };
    }
};