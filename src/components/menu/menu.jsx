import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu" style={{height: window.innerHeight}}>
      <div className="account d-flex align-items-center">
        <div className="avatar">
          <img src={require("./../../assets/img/download.jfif")} alt="avatar" />
        </div>
        <div className="account-info">
          <h5 className="font-weight-bold text-warning">Cyberbugs</h5>
        </div>
      </div>
      <div className="control">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item d-flex align-items-center active">
            <i className="mr-2 fa fa-credit-card" />
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Cyber Board
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
            <i className="mr-2 fas fa-tasks"></i>
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/project-management"
            >
              Project management
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="feature">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item d-flex align-items-center active">
            <i className="mr-2 fa fa-truck" />
            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Releases
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-equals" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/create-project"
            >
              Issues and filters
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-paste" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/project-management"
            >
              Pages
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-location-arrow" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/project-management"
            >
              Reports
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-box" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/project-management"
            >
              Components
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
