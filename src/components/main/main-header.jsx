import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainHeader(props) {
  const styleCursor = {
    cursor: "pointer",
  };
  const navigate = useNavigate();
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li
            className="breadcrumb-item"
            style={styleCursor}
            onClick={() => navigate("/")}
          >
            Project management
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
