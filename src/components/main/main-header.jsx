import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainHeader(props) {
  const styleBtn = {
    background: "aqua",
    padding: "5px 10px",
    borderRadius: "10px"
  }
  const styleCursor = {
    cursor: "pointer",
  };
  const navigate = useNavigate();
  return (
    <div className="header d-flex justify-content-between align-items-center">
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
      <div className="searchTask" style={styleBtn}>
        <a data-toggle="modal" data-target="#searchTask">
          <i className="fas fa-search"></i> Search task
        </a>
      </div>
    </div>
  );
}
