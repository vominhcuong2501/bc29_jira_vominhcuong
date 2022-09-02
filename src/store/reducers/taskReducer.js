import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER, SELECTED_USER } from "../types/taskType"
const DEFAULT_STATE = {
    selectedUser: [],
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 3,
            "priority": "Low"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            
        ],
        "lstComment": [],
        "taskId": 5445,
        "taskName": "fix css",
        "alias": "fix-css",
        "description": "1231231231",
        "statusId":4,
        "originalEstimate": 0,
        "timeTrackingSpent": 3,
        "timeTrackingRemaining": 5,
        "typeId": 1,
        "priorityId": 3,
        "projectId": 7104
    }
};

export const taskReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SELECTED_USER: {
            return { ...state, selectedUser: action.payload }
        }

        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.payload }
        }

        case CHANGE_TASK_MODAL: {
            const {name, value} = action
            console.log(name, value);
            return {...state, taskDetailModal: {...state.taskDetailModal, [name]: value}}
        }

        default:
            return { ...state };
    }
};