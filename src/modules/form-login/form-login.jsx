import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../store/actions/userAction";
import { fetchUserLogin } from "../../services/user";
import { USER_LOGIN_KEY } from "../../constans/common";
import { useNavigate } from "react-router-dom";
import { REMEMBER_USER } from "../../store/types/userType";

export default function FormLogin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    if (values.remember) {
      localStorage.setItem(REMEMBER_USER, JSON.stringify(values));
    } else {
      localStorage.removeItem(REMEMBER_USER);
    }
    try {
      const result = await fetchUserLogin(values);
      localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(result.data.content));
      dispatch(setUserAction(result.data.content));
      notification.success({
        description: "Successfully !",
      });
      navigate("/");
    } catch (err) {
      notification.error({
        message: err.response.data?.content,
      });
    }
  };

  let rememberUser = localStorage.getItem(REMEMBER_USER);
  if (rememberUser) {
    rememberUser = JSON.parse(rememberUser);
  }

  useEffect(() => {
    if (rememberUser) {
      form.setFieldsValue({
        ...rememberUser,
      });
    }
  }, [rememberUser]);
  return (
    <Form
      width={window.innerWidth / 2}
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        email: "",
        passWord: "",
        remember: false,
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
          title="Login with Facebook"
          style={{
            backgroundColor: "#065fd4",
            margin: "0 5px",
            color: "white"
          }}
          // shape="circle"
          size="large"
        >
          <i
            className="fab fa-facebook-f text-white mr-2"
            style={{ fontSize: 20 }}
          ></i> Login with Facebook
        </Button>
      </div>
    </Form>
  );
}
