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
            {
                "id": 2093,
                "avatar": "https://ui-avatars.com/api/?name=Huynh Quoc Khanh",
                "name": "Huynh Quoc Khanh",
                "alias": "huynh-quoc-khanh"
            },
            {
                "id": 2013,
                "avatar": "https://ui-avatars.com/api/?name=Mạch Ngọc Đức Anh",
                "name": "Mạch Ngọc Đức Anh",
                "alias": "mach-ngoc-duc-anh"
            },
            {
                "id": 2078,
                "avatar": "https://ui-avatars.com/api/?name=Carrie Le",
                "name": "Carrie Le",
                "alias": "carrie-le"
            }
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
            console.log(action);
            return {...state, taskDetailModal: {...state.taskDetailModal, [name]: value}}
        }

        case CHANGE_ASSIGNESS: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.payload]
            return {...state}
        }

        case REMOVE_USER: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(user => action.payload != user.id)]
            return {...state}
        }
        default:
            return { ...state };
    }
};