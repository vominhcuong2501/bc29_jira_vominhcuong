import FormCreateTask from "../../modules/form-create-task/form-create-task"
import FormEditProject from "../../modules/form-edit-project/form-edit-project"
import { CLOSE_MODAL_EDIT, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_PROJECT } from "../types/modalEditTypes"

export const closeEditModalAction = () => {
    return ({
        type: CLOSE_MODAL_EDIT,
        payload: false
    })
}

export const openFormEditProjectAction = () => {
    return ({
        type: OPEN_FORM_EDIT_PROJECT,
        title: "Edit project",
        Component: <FormEditProject />,
    })
}

export const openFormCreateTaskAction = () => {
    return ({
        type: OPEN_FORM_CREATE_TASK,
        title: "Create task",
        Component: <FormCreateTask />,
    })
}