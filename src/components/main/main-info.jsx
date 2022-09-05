import React from "react";
import parse from 'html-react-parser';

export default function MainInfo(props) {
  const { members, projectName, description, lstTask } = props.projectDetail;
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
      <button className="btn btn-outline-info" data-toggle="modal" data-target="#searchModal">
          Search task
        </button>
      
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
      </div>
    </>
  );
}
