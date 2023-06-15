import React from "react";

export default function MainHeader(props) {
  const styleBtn = {
    background: "aqua",
    padding: "5px 10px",
    borderRadius: "10px"
  }
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">Project management</li>
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
