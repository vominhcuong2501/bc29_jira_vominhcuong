import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/menu/menu";
import Sidebar from "../components/sidebar/sidebar";
import TaskDetailModal from "../components/modal/modal";
import Header from "../components/header/header";

export default function HomeLayout() {
  return (
    <div className="jira container-fluid p-0">
      <Sidebar />
      <Menu />
      <div className="container p-0 m-0">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Header />
          <Outlet />
        </div>
      </div>

      <TaskDetailModal />
    </div>
  );
}
