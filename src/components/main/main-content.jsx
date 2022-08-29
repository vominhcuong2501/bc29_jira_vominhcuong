import React from "react";

export default function MainContent(props) {
  const {
    creator,
    description,
    lstTask,
    members,
    projectCategory,
    projectName,
  } = props.projectDetail;
  const renderCardTaskList = () => {
    return lstTask?.map((ele) => {
      return (
        <div
          className="card "
          style={{ height: "25rem", width: "17rem" }}
          key={ele.statusId}
        >
          <div className="card-header">{ele.statusName}</div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("./../../assets/img/download (1).jfif")}
                        alt="avatar"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("./../../assets/img/download (2).jfif")}
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-check-square" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("./../../assets/img/download (1).jfif")}
                        alt="avatar"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("./../../assets/img/download (2).jfif")}
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <div className="content" style={{ display: "flex" }}>
        {renderCardTaskList()}
      </div>
    </div>
  );
}
