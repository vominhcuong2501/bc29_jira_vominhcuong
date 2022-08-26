import {
  SearchOutlined,
  PlusOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      label: (
        <Link to="/">
          <LaptopOutlined  style={{ fontSize: 25, textAlign: "center" }} />
        </Link>
      ),
      key: "1",
    },
    {
      label: "Create issue",
      key: "2",
      icon: <PlusOutlined style={{ fontSize: 20 }} />,
    },
    {
      label: "Search",
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
