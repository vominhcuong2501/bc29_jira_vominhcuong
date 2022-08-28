import { CLOSE_MODAL_EDIT, OPEN_FORM_EDIT_PROJECT } from "../types/modalEditTypes";

const DEFAULT_STATE = {
    visible: false,
    componentModalContent: "",
};

export const modalEditProjectReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case CLOSE_MODAL_EDIT: {
            return { ...state, visible: false }
        }
        case OPEN_FORM_EDIT_PROJECT: {
            return { ...state, visible: true, componentModalContent: action.Component }
        }
        default:
            return { ...state };
    }
};