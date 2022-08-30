import { GET_TASK_DETAIL, SELECTED_USER } from "../types/taskType"
const DEFAULT_STATE = {
    selectedUser: [],
    taskDetailModal: {}
};

export const taskReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SELECTED_USER: {
            return { ...state, selectedUser: payload }
        }

        case GET_TASK_DETAIL: {
            console.log("payload", payload);
            return { ...state, taskDetailModal: payload }
        }
        default:
            return { ...state };
    }
};