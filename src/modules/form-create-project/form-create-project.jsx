import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { fetchProjectCategoryApi } from "../../services/category";
import { useAsync } from "../../hooks/useAsync";
import { Editor } from "@tinymce/tinymce-react";
import { fetchCreateProjectAuthorizeApi } from "../../services/project";

export default function FormCreateProject() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);
  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Select.Option value="http://">http://</Select.Option>
      <Select.Option value="https://">https://</Select.Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com" className="select-after">
      <Select.Option value=".com">.com</Select.Option>
      <Select.Option value=".jp">.jp</Select.Option>
      <Select.Option value=".cn">.cn</Select.Option>
      <Select.Option value=".org">.org</Select.Option>
    </Select>
  );

  const { state: arrProject = [] } = useAsync({
    service: () => fetchProjectCategoryApi(),
  });

  const editorRef = useRef(null);

  const handleSubmit = async (values) => {
    const project = {...values, description: editorRef.current.getContent()}
    try{
      await fetchCreateProjectAuthorizeApi(project)
      notification.success({
        description: "Successfully !"
      })
      navigate("/project-management")
    } catch(err) {
      console.log(err);
      notification.error({
        message: err.response.data.content
      })
    }
    console.log(project);
  };

  return (
    <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
      <h3 className="mb-3">Create project</h3>
      <Form
        layout="vertical"
        form={form}
        style={{ width: size.width / 2 }}
        onFinish={handleSubmit}
        initialValues={{
          projectName: "",
          categoryId: "",
        }}
      >
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
        <Form.Item
          label="URL"
          validateTrigger={["onChange"]}
        >
          <Input size="large" addonBefore={selectBefore} addonAfter={selectAfter} />
        </Form.Item>
        <span>
          <i
            style={{ fontSize: "7px", color: "#f96628" }}
            className="fas fa-asterisk mr-1"
          ></i>
        </span>
        <span>Description</span>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          name="description"
          init={{
            height: 200,
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
        <Form.Item
          className="mt-4"
          name="categoryId"
          label="Project Category"
          validateTrigger={["onChange"]}
          rules={[
            { required: true, message: "Please input your project category" },
          ]}
        >
          <Select size="large">
            <Select.Option value="">Choose project category</Select.Option>
            {arrProject?.map((ele, index) => {
              return (
                <Select.Option value={ele.id} key={index}>
                  {ele.projectCategoryName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            return (
              <Button
              className="text-light"
                style={{ backgroundColor: "#065fd4" }}
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched() ||
                  form.getFieldsError().some((ele) => ele.errors.length > 0)
                }
              >
              Submit
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
}
