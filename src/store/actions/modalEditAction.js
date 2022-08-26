import FormEditProject from "../../modules/form-edit-project/form-edit-project"
import { CLOSE_MODAL_EDIT, OPEN_FORM_EDIT_PROJECT } from "../types/modalEditTypes"

export const closeEditModalAction = () => {
    return ({
        type: CLOSE_MODAL_EDIT,
        payload: false
    })
}

export const openFormEditProjectAction = () => {
    return ({
        type: OPEN_FORM_EDIT_PROJECT,
        Component:<FormEditProject />,
    })
}