import React, { useEffect, useRef } from "react";
import { Button, Form, Input, notification } from "antd";
import { Select } from "antd";
import { fetchProjectCategoryApi } from "../../services/category";
import { useAsync } from "../../hooks/useAsync";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateProjectApi } from "../../services/project";
import { closeEditModalAction } from "../../store/actions/modalEditAction";
import { setTableAction } from "../../store/actions/projectAction";

export default function FormEditProject() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const { projectEdit, table } = useSelector((state) => state.projectReducer);
  const { state: arrProject = [] } = useAsync({
    service: () => fetchProjectCategoryApi(),
  });

  const editorRef = useRef(null);

  useEffect(() => {
    if (projectEdit) {
      form.setFieldsValue({
        ...projectEdit,
        categoryId: projectEdit.projectCategory?.id,
      });
    }
  }, [projectEdit]);

  const handleSubmit = async (values) => {
    const projectUpdate = {
      ...values,
      description: editorRef.current.getContent(),
    };
    try {
      await fetchUpdateProjectApi(projectUpdate);
      notification.success({
        description: "Successfully !",
      });
      dispatch(closeEditModalAction());
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }

    // update lại giao diện khi có thay dổi do lấy từ redux về
    for (let key in table) {
      let newCategoryName = "";
      if (projectUpdate.categoryId === 1) {
        newCategoryName = "Dự án web";
      } else if (projectUpdate.categoryId === 2) {
        newCategoryName = "Dự án phần mềm";
      } else {
        newCategoryName = "Dự án di động";
      }
      if (table[key].id === projectUpdate.id) {
        table[key] = {
          ...table[key],
          description: projectUpdate.description,
          categoryId: projectUpdate.categoryId,
          projectName: projectUpdate.projectName,
          categoryName: newCategoryName,
        };
      }
    }
    dispatch(setTableAction(table));
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          projectName: "",
          categoryId: "",
          id: "",
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-12">
            <Form.Item
              name="id"
              label="Project ID"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your project ID!",
                },
              ]}
            >
              <Input size="large" disabled />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-12">
            <Form.Item
              name="projectName"
              label="Project name"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your project name!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className=" col-12">
            <Form.Item
              name="categoryId"
              label="Project Category"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your project category",
                },
              ]}
            >
              <Select size="large" value={projectEdit.projectCategory?.id}>
                {arrProject?.map((ele, index) => {
                  return (
                    <Select.Option value={ele.id} key={index}>
                      {ele.projectCategoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="col-12 p-0">
          <span>
            <i
              style={{ fontSize: "7px", color: "#f96628" }}
              className="fas fa-asterisk mr-1"
            ></i>
          </span>
          <span>Description</span>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={projectEdit.description}
            name="description"
            init={{
              height: 300,
              menubar: false,

              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <Form.Item className="text-right">
          <Button
            className="mt-4 text-light"
            style={{ backgroundColor: "#065fd4" }}
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="mt-4 ml-2 bg-light"
            style={{ backgroundColor: "#white" }}
            onClick={() => dispatch(closeEditModalAction())}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
