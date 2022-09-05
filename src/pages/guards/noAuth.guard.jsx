import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function NoAuthGuard() {
  const { userInfo } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);
  
  return (
    <div>
      <Outlet />
    </div>
  );
}
