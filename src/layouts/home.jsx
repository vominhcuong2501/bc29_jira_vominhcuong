import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/menu/menu";
import Sidebar from "../components/sidebar/sidebar";
import TaskDetailModal from "../components/modal/modal";
import Header from "../components/header/header";
import "./text-mobile.css";

export default function HomeLayout() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 992 ? (
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
      ) : (
        <ul className="loading-mobile">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      )}
    </>
  );
}
