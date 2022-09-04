import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_KEY } from "../../constans/common";
import { setUserAction } from "../../store/actions/userAction";

export default function Menu() {

  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="menu" style={{ height: window.innerHeight }}>
      <div className="account d-flex align-items-center mt-3">
        <div className="avatar p-0">
          <img src={userInfo?.avatar} alt="avatar" />
        </div>
        <div className="account-info p-0">
          <h5 className="font-weight-bold text-warning m-0">
            {userInfo?.name}
            <i
              className="fas fa-sign-out-alt text-danger ml-2"
              onClick={() => {
                localStorage.removeItem(USER_LOGIN_KEY);
                dispatch(setUserAction(null));
                navigate("/login");
              }}
              style={{cursor: "pointer"}}
              title="Log out"
            ></i>
          </h5>
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
              to="/"
            >
              Issues and filters
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-paste" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Pages
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-location-arrow" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Reports
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i className="mr-2 fa fa-box" />

            <NavLink
              className="nav-link text-dark"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Components
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
