import React from "react";
import parse from 'html-react-parser';


export default function MainInfo(props) {
  const { members, projectName, description } = props.projectDetail;
  const parse = require("html-react-parser"); // biên dịch cho thư viện tiny
  const descriptionHtml = parse(`${description}`)
  const renderAvatar = () => {
    return members?.map((user) => {
      return (
        <div className="avatar" key={user.userId}>
          <img src={user.avatar} alt={user.avatar} />
        </div>
      );
    });
  };
  return (
    <>
      <h3>{projectName}</h3>
      <section>{descriptionHtml}</section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
