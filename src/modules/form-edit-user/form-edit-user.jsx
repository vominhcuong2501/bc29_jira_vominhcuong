import React, { useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUserApi, getUserListApi } from "../../services/user";
import { getUserListAction } from "../../store/actions/userAction";
import { closeEditModalAction } from "../../store/actions/modalEditAction";

export default function FormEditUser() {

  const dispatch = useDispatch()

  const [form] = Form.useForm();
  
  const { userEdit } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if(userEdit) {
      form.setFieldsValue({
        ...userEdit
      })
    }
  }, [userEdit])

  const handleSubmit = async (values) => {
    const userUpdate = {...values, id: userEdit.userId.toString()}
    try {
      await fetchUpdateUserApi(userUpdate);
      notification.success({
        description: "Successfully !",
      });
      const result = await getUserListApi();
      dispatch(getUserListAction(result.data.content));
      dispatch(closeEditModalAction());
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
      layout="vertical"
      initialValues={{
        email: "",
        passWord: "",
        name: "",
        phoneNumber: "",
        id: "",
      }}
    >
      <Form.Item
        label="User ID"
        name="userId"
        validateTrigger={["onChange"]}
        rules={[
          {
            required: true,
            message: "Please input your userId!",
          },
        ]}
      >
        <Input
          size="large"
          style={{ minWidth: 350 }}
          prefix={<IdcardOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item
        label="Email"
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
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Password"
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
          prefix={<KeyOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Name"
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
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Phone number"
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
          prefix={<PhoneOutlined />}
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => {
          return (
            <Button
              style={{ backgroundColor: "#065fd4", color: "white" }}
              htmlType="submit"
              block
              disabled={
                !form.isFieldsTouched() ||
                form.getFieldsError().some((ele) => ele.errors.length > 0)
              }
            >
              Update user
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
}
