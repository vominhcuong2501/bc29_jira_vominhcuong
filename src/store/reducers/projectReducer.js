import { GET_ALL_PROJECT, GET_PROJECT_DETAIL, GET_PROJECT_EDIT, GET_TABLE, UPDATE_TABLE } from "../types/projectType";

const DEFAULT_STATE = {
    projectEdit: {},
    table: [],
    projectDetail: {},
    arrProject: []
};

export const projectReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROJECT_EDIT: {
            return { ...state, projectEdit: payload }
        }
        case GET_TABLE: {
            return { ...state, table: payload }
        }
        case UPDATE_TABLE: {
            return { ...state, table: [...payload] }
        }

        case GET_PROJECT_DETAIL: {
            return { ...state, projectDetail: payload }
        }
        case GET_ALL_PROJECT: {
            return { ...state, arrProject: payload }
        }
        default:
            return { ...state };
    }
};