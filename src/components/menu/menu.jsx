import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./menu.scss";

export default function Menu() {
  return (
    <div className="menu" style={{ height: window.innerHeight }}>
      <div className="account d-flex align-items-center mt-3">
        <div className="avatar p-0">
          <img src={require("../../assets/img/download.jfif")} alt="avatar" />
        </div>
        <div className="account-info p-0">
          <h5 className="font-weight-bold text-warning m-0">CyberBugs</h5>
        </div>
      </div>
      <div className="control">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item d-flex align-items-center active">
            <i className="mr-2 fas fa-tasks"></i>
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Project management
            </NavLink>
          </li>

          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-cog" />
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/create-project"
            >
              Create project
            </NavLink>
          </li>

          <li className="nav-item d-flex align-items-center ">
            <UserOutlined className="mr-2" />
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/user-management"
            >
              User management
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="feature">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item d-flex align-items-center active">
            <i className="mr-2 fa fa-truck" />
            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Releases
            </a>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-equals" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Issues and filters
            </a>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-paste" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Pages
            </a>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-location-arrow" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Reports
            </a>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-box" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Components
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
