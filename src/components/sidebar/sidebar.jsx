import React from "react";

export default function Sidebar() {
  return (
    <div className="sideBar">
      <div className="sideBar-top">
        <div className="sideBar-icon">
          <i className="fab fa-jira mr-2" />
        </div>
        <div
          className="sideBar-icon"
          data-toggle="modal"
          data-target="#searchModal"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-search mr-2" />
          <span className="title">SEARCH ISSUES</span>
        </div>
        <div className="sideBar-icon">
          <i className="fa fa-plus mr-2" />
          <span className="title">CREATE ISSUES</span>
        </div>
      </div>
      <div className="sideBar-bottom">
        <div className="sideBar-icon">
          <i className="fa fa-question-circle mr-2" />
          <span className="title">ABOUT</span>
        </div>
      </div>
    </div>
  );
}
