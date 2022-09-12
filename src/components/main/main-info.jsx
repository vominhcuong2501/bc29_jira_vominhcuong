import React from "react";
import parse from "html-react-parser";

export default function MainInfo(props) {
  const { members, projectName, description, lstTask } = props.projectDetail;
  const descriptionHtml = parse(`${description}`);
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
    <div>
      <h3 className="font-weight-bold text-success">{projectName}</h3>
      <section>{descriptionHtml}</section>
      <div className="info" style={{ display: "flex", alignItems: "center" }}>
        <span className="font-weight-bold m-0">Members:</span>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
      </div>
    </div>
  );
}
