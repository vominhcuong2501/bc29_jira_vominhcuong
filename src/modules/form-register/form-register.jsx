import React from "react";
import { Button, Form, Input, notification } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { fetchUserRegister } from "../../services/user";
import { useNavigate } from "react-router-dom";

export default function FromRegister() {

  const navigate = useNavigate();
  
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await fetchUserRegister(values);
      notification.success({
        description: "Successfully !",
      });
      navigate("/login");
    } catch (err) {
      notification.error({
        message: err.response.data.content,
      });
    }
  };

  return (
    <Form
      width={window.innerWidth / 2}
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        email: "",
        passWord: "",
        name: "",
        phoneNumber: "",
      }}
    >
      <Form.Item
        name="email"
        validateTrigger={["onChange"]}
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email is invalid",
          },
        ]}
      >
        <Input
          size="large"
          style={{ minWidth: 350 }}
          placeholder="Email"
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="passWord"
        validateTrigger={["onChange"]}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          size="large"
          style={{ minWidth: 350 }}
          placeholder="Password"
          prefix={<KeyOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="name"
        validateTrigger={["onChange"]}
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
          {
            pattern:
              "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
              "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
              "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            message: "Name is invalid",
          },
        ]}
      >
        <Input
          size="large"
          style={{ minWidth: 350 }}
          placeholder="name"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        validateTrigger={["onChange"]}
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          size="large"
          style={{ minWidth: 350 }}
          placeholder="Phone number"
          prefix={<PhoneOutlined />}
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => {
          return (
            <>
              <Button
                style={{ backgroundColor: "rgb(102, 117, 223)" }}
                htmlType="submit"
                block
                disabled={
                  !form.isFieldsTouched() ||
                  form.getFieldsError().some((ele) => ele.errors.length > 0)
                }
              >
                SIGN UP
              </Button>
              <p className="mt-2">
                If you already have an account, click{" "}
                <a
                  className="text-primary font-weight-bold"
                  onClick={() => navigate("/login")}
                >
                  login
                </a>
              </p>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
}
