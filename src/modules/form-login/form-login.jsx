import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../store/actions/userAction";
import { fetchUserLogin } from "../../services/user";
import { ACCESS_TOKEN, USER_LOGIN_KEY } from "../../constans/common";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  

  const handleSubmit = async (values) => {
    try {
      const result = await fetchUserLogin(values);

      localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(result.data.content));
      localStorage.setItem(
        ACCESS_TOKEN,
        JSON.stringify(result.data.content.accessToken)
      );

      dispatch(setUserAction(result.data.content));
      notification.success({
        description: "Successfully !",
      });
      navigate("/");
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
          style={{ width: 350 }}
          placeholder="Email"
          prefix={<UserOutlined className="site-form-item-icon" />}
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
          style={{ width: 350 }}
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
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
                SIGN IN
              </Button>
              <p className="mt-2 mb-0">
                If you don't have an account, click{" "}
                <a
                  className="text-primary font-weight-bold"
                  onClick={() => navigate("/register")}
                >
                  register
                </a>
              </p>
            </>
          );
        }}
      </Form.Item>

      <div className="text-center">
        <Button
          style={{
            backgroundColor: "#065fd4",
            margin: "0 5px",
          }}
          shape="circle"
          size="large"
        >
          <i
            className="fab fa-facebook-f text-white"
            style={{ fontSize: 20 }}
          ></i>
        </Button>
        <Button
          type="primary"
          shape="circle"
          size="large"
          style={{ margin: "0 5px" }}
        >
          <i className="fab fa-twitter" style={{ fontSize: 20 }}></i>
        </Button>
      </div>
    </Form>
  );
}
