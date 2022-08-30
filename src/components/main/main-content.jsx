import React from "react";
import { useDispatch } from "react-redux";
import { fetchTaskDetailApi } from "../../services/task";
import { getTaskDetailAction } from "../../store/actions/taskAcion";

export default function MainContent(props) {
  const dispatch = useDispatch();

  const { lstTask } = props.projectDetail;

  const renderCardTaskList = () => {
    return lstTask?.map((ele) => {
      return (
        <div
          className="card "
          style={{ height: "auto", width: "17rem" }}
          key={ele.statusId}
        >
          <div className="card-header">{ele.statusName}</div>
          <ul className="list-group list-group-flush">
            {ele.lstTaskDeTail.map((ele) => {
              
              return (
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  key={ele.taskName}
                  onClick={async () => {
                    const result = await fetchTaskDetailApi(ele.taskId);
                    dispatch(getTaskDetailAction(result.data.content));
                  }}
                >
                  <h5 className="font-weight-bold text-success mb-3">
                    {ele.taskName}
                  </h5>
                  <div
                    className="block"
                    title="Priority"
                    style={{ display: "flex" }}
                  >
                    <div className="block-left">
                      <p className="text-danger">{ele.priorityTask.priority}</p>
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {ele.assigness.map((ele) => {
                          return (
                            <div className="avatar" key={ele.id}>
                              <img src={ele.avatar} alt={ele.avatar} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="container p-0">
      <div className="content" style={{ display: "flex" }}>
        {renderCardTaskList()}
      </div>
    </div>
  );
}
