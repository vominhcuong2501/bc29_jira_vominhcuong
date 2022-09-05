import {
  SearchOutlined,
  PlusOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { openFormCreateTaskAction } from "../../store/actions/modalEditAction";

const { Sider } = Layout;

export default function Sidebar() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "1",
      icon: <LaptopOutlined style={{ fontSize: 20 }} />,
    },
    {
      label: (
        <a onClick={() => dispatch(openFormCreateTaskAction())}>Create task</a>
      ),
      key: "2",
      icon: <PlusOutlined style={{ fontSize: 20 }} />,
    },
    {
      label: (
        <a data-toggle="modal" data-target="#searchModal">
          Search task
        </a>
      ),
      key: "3",
      icon: <SearchOutlined style={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ height: window.innerHeight }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      ></Menu>
    </Sider>
  );
}
