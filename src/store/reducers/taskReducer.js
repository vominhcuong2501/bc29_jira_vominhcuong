import { GET_TASK_DETAIL, SELECTED_USER } from "../types/taskType"
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
        "taskId": 5424,
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

export const taskReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SELECTED_USER: {
            return { ...state, selectedUser: payload }
        }

        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: payload }
        }
        default:
            return { ...state };
    }
};