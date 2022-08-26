import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { fetchProjectCategoryApi } from "../../services/category";
import { useAsync } from "../../hooks/useAsync";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { setSubmitEditAction } from "../../store/actions/modalEditAction";

export default function FormEditProject() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const projectEdit = useSelector((state) => state.projectReducer);

  console.log(projectEdit.projectEdit?.projectCategory?.name);
  const { state: arrProject = [] } = useAsync({
    service: () => fetchProjectCategoryApi(),
  });

  const editorRef = useRef(null);

  useEffect(() => {
    if (projectEdit.projectEdit) {
      form.setFieldsValue({
        ...projectEdit.projectEdit,
      });
    }
  }, [projectEdit.projectEdit]);

  const handleSubmit1 = (values) => {
    // const project = {...values, description: editorRef.current.getContent()}
    // try{
    //   await fetchCreateProjectAuthorizeApi(project)
    //   notification.success({
    //     description: "Successfully !"
    //   })
    //   navigate("/")
    // } catch(err) {
    //   console.log(err);
    //   notification.error({
    //     message: err.response.data.content
    //   })
    // }
    console.log(values);
  };

  return (
    <div className="d-flex flex-column mt-3 justify-content-center align-items-center">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit1}
        initialValues={{
          projectName: "",
          categoryId: "",
          id: "",
        }}
      >
        <div className="row">
          <div className="col-lg-4 col-12">
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
          <div className="col-lg-4 col-12">
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
          <div className="col-lg-4 col-12">
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
              <Select
                size="large"
                value={projectEdit.projectEdit?.projectCategory?.name}
              >
                <Select.Option
                  value={projectEdit.projectEdit?.projectCategory?.name}
                >
                  {projectEdit.projectEdit?.projectCategory?.name}
                </Select.Option>
                {arrProject?.map((ele, index) => {
                  return (
                    <Select.Option values={ele.id} key={index}>
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
            initialValue={projectEdit.projectEdit?.description}
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
        <Form.Item shouldUpdate>
          <Button
            className="mt-4 text-light"
            style={{ backgroundColor: "#065fd4" }}
            htmlType="submit"
          >
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
