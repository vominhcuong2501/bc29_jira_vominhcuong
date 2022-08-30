import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/menu/menu";
import Sidebar from "../components/sidebar/sidebar";
import TaskDetailModal from "../components/modal/modal";


export default function HomeLayout() {
  return (
      <div className="jira container-fluid p-0">
        <Sidebar />
        <Menu />
        <Outlet />
        <TaskDetailModal />
      </div>
      
  );
}
