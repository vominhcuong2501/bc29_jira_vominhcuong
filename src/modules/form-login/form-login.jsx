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
    // nếu check ô remember sẽ set thông tin login vào localstorage
    if (values.remember) {
      localStorage.setItem(REMEMBER_USER, JSON.stringify(values));
    } else {
      localStorage.removeItem(REMEMBER_USER);
    }

    // submit form
    try {
      const result = await fetchUserLogin(values);
      localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(result.data.content));
      dispatch(setUserAction(result.data.content));
      notification.success({
        description: "Successfully !",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.response.data?.message,
      });
    }
  };

  // nếu có thông tin remember trên localstorage thì sẽ lấy nó về chuyển thành object
  let rememberUser = localStorage.getItem(REMEMBER_USER);
  if (rememberUser) {
    rememberUser = JSON.parse(rememberUser);
  }
  // set thông tin vào form và thực hiện thay dổi thông tin khi có nhu cầu
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
          {
            pattern:
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            message: "Passwors is invalid (Ex: Teo@123, Miku$123)",
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
    </Form>
  );
}
