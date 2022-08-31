import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchGetPriorityApi,
  fetchGetStatusApi,
} from "../../services/cyberbugs";
import parse from "html-react-parser";
import { notification } from "antd";
import { fetchUpdateEstimateApi, fetchUpdatePriorityApi, fetchUpdateStatusApi } from "../../services/task";
import { useNavigate } from "react-router-dom";
import { fetchGetProjectDetailApi } from "../../services/project";
import { getProjectDetailAction } from "../../store/actions/projectAction";

export default function TaskDetailModal() {
  const { taskDetailModal } = useSelector((state) => state.taskReducer);

  const {
    assigness,
    description,
    originalEstimate,
    priorityTask,
    statusId,
    taskName,
    taskId,
    taskTypeDetail,
    timeTrackingRemaining,
    timeTrackingSpent,
    projectId,
  } = taskDetailModal;

  console.log(taskDetailModal);
  // const parse = require("html-react-parser");

  const descriptionHtml = parse(`${description}`);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { state: status = [] } = useAsync({
    service: () => fetchGetStatusApi(),
  });

  const { state: priority = [] } = useAsync({
    service: () => fetchGetPriorityApi(),
  });

  const setProjectDetail = async () => {
    const result = await fetchGetProjectDetailApi(projectId);
    dispatch(getProjectDetailAction(result.data.content));
    console.log(result.data.content);
  };

  const renderTimeTracking = () => {
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div style={{ display: "flex" }}>
        <i className="fa fa-clock" />
        <div style={{ width: "100%" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={Number(timeTrackingSpent)}
              aria-valuemin={Number(timeTrackingRemaining)}
              aria-valuemax={max}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
            <p className="estimate-time">
              {Number(timeTrackingRemaining)}h remaining
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header pb-0">
              <div className="task-title">
                <h5 className="font-weight-bold">
                  <i className="fa fa-bookmark" /> {taskName}
                </h5>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">
                      This is an issue of type: {taskTypeDetail?.taskType}.
                    </p>
                    <div className="description">
                      <h6 className="text-warning font-weight-bold">
                        {" "}
                        * Description
                      </h6>
                      {descriptionHtml}
                    </div>
                    <div className="comment mt-3">
                      <h6 className="text-warning font-weight-bold mb-3">
                        {" "}
                        * Comment
                      </h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img
                            src={require("./../../assets/img/download (1).jfif")}
                            alt="avatar"
                          />
                        </div>
                        <div className="input-comment">
                          <input type="text" placeholder="Add a comment ..." />
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src={require("./../../assets/img/download (1).jfif")}
                                alt="avatar"
                              />
                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus tempora ex
                                voluptatum saepe ab officiis alias totam ad
                                accusamus molestiae?
                              </p>
                              <div>
                                <span style={{ color: "#929398" }}>Edit</span>•
                                <span style={{ color: "#929398" }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6 className="text-warning font-weight-bold">
                        * STATUS
                      </h6>
                      <select
                        className="custom-select"
                        value={statusId}
                        onChange={async (e) => {
                          try {
                            await fetchUpdateStatusApi({
                              taskId: taskId,
                              statusId: e.target.value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail()
                          } catch (error) {
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
                      >
                        {status.map((ele, index) => {
                          return (
                            <option value={ele.statusId} key={index}>
                              {ele.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6 className="text-warning font-weight-bold">
                        * ASSIGNEES
                      </h6>
                      <div>
                        {assigness?.map((ele, index) => {
                          return (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              className="item"
                              key={index}
                            >
                              <div className="avatar mr-2">
                                <img src={ele.avatar} alt="avatar" />
                              </div>
                              <p className="name">
                                {ele.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5 }}
                                />
                              </p>
                            </div>
                          );
                        })}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa fa-plus"
                            style={{ marginRight: 5 }}
                          />
                          <span>Add more</span>
                        </div>
                      </div>
                    </div>
                    <div className="priority" style={{ margin: "20px 0" }}>
                      <h6 className="text-warning font-weight-bold">
                        * PRIORITY
                      </h6>
                      <select
                        className="custom-select"
                        value={priorityTask?.priorityId}
                        onChange={async (e) => {
                          try {
                            await fetchUpdatePriorityApi({
                              taskId: taskId,
                              priorityId: e.target.value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail()
                          } catch (error) {
                            console.log(error);
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
                      >
                        {priority.map((ele, index) => {
                          return (
                            <option value={ele.priorityId} key={index}>
                              {ele.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6 className="text-warning font-weight-bold">
                        * ORIGINAL ESTIMATE (HOURS)
                      </h6>
                      <input
                        type="text"
                        className="estimate-hours"
                        value={originalEstimate}
                        onChange={async (e) => {
                          try {
                            await fetchUpdateEstimateApi({
                              taskId: taskId,
                              originalEstimate: e.target.value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail()
                          } catch (error) {
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6 className="text-warning font-weight-bold">
                        * TIME TRACKING
                      </h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
