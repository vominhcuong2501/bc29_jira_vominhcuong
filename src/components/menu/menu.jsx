import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./menu.scss";

export default function Menu() {
  const styleMenu = {
    display: "flex",
    flexDirection: "column",
  };
  return (
    <nav
      className="menu navbar-expand-md navbar-light bg-light"
      style={{ height: window.innerHeight }}
    >
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId" >
        <ul className="navbar-nav mr-auto my-3" style={styleMenu}>
          <li className="nav-item ">
            <NavLink
              className="nav-link account d-flex align-items-center m-0"
              style={{ textDecoration: "none" }}
              to="/"
            >
              <div className="avatar p-0">
                <img
                  src={require("../../assets/img/download.jfif")}
                  alt="avatar"
                />
              </div>
              <div className="account-info p-0">
                <h5 className="font-weight-bold text-warning m-0">CyberBugs</h5>
              </div>
            </NavLink>
          </li>
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
          <li className="nav-item d-flex align-items-center feature" style={{borderTop: "2px dashed black"}}>
            <i className="mr-2 fa fa-truck" />
            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Releases
            </a>
          </li>
          <li className="nav-item d-flex align-items-center feature ">
            <i className="mr-2 fa fa-equals" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Issues and filters
            </a>
          </li>
          <li className="nav-item d-flex align-items-center feature ">
            <i className="mr-2 fa fa-paste" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Pages
            </a>
          </li>
          <li className="nav-item d-flex align-items-center feature ">
            <i className="mr-2 fa fa-location-arrow" />

            <a
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
            >
              Reports
            </a>
          </li>
          <li className="nav-item d-flex align-items-center feature ">
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
    </nav>
  );
}
