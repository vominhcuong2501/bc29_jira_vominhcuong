import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchGetPriorityApi,
  fetchGetStatusApi,
  fetchGetTaskTypeApi,
} from "../../services/cyberbugs";
import parse from "html-react-parser";
import {
  changeAssignessModal,
  changeTaskModal,
  removeUserAssignessAction,
} from "../../store/actions/taskAction";
import { Editor } from "@tinymce/tinymce-react";
import { CHANGE_TASK_MODAL } from "../../store/types/taskType";
import { fetchGetProjectDetailApi } from "../../services/project";
import { getProjectDetailAction } from "../../store/actions/projectAction";
import { Select, notification } from "antd";
import { fetchRemoveTaskApi } from "../../services/task";
const { Option } = Select;

export default function TaskDetailModal() {
  const { taskDetailModal } = useSelector((state) => state.taskReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);

  console.log(projectDetail);
  // set dữ liệu cho desciption
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [contentDes, setContentDes] = useState(taskDetailModal.description);
  const [historyDes, setHistoryDes] = useState(taskDetailModal.description);

  const dispatch = useDispatch();

  const { state: status = [] } = useAsync({
    service: () => fetchGetStatusApi(),
  });

  const { state: priority = [] } = useAsync({
    service: () => fetchGetPriorityApi(),
  });

  const { state: taskType = [] } = useAsync({
    service: () => fetchGetTaskTypeApi(),
  });

  const setProjectDetail = async () => {
    const result = await fetchGetProjectDetailApi(taskDetailModal.projectId);
    dispatch(getProjectDetailAction(result.data.content));
    console.log(result.data.content);
  };

  const renderTimeTracking = () => {
    const max =
      Number(taskDetailModal.timeTrackingSpent) +
      Number(taskDetailModal.timeTrackingRemaining);
    const percent = Math.round(
      (Number(taskDetailModal.timeTrackingSpent) / max) * 100
    );
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(taskDetailModal.timeTrackingSpent)}
                aria-valuemin={Number(taskDetailModal.timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">
                {Number(taskDetailModal.timeTrackingSpent)}h logged
              </p>
              <p className="estimate-time">
                {Number(taskDetailModal.timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              min={0}
              className="form-control"
              name="timeTrackingSpent"
              value={taskDetailModal.timeTrackingSpent}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              min={0}
              className="form-control"
              name="timeTrackingRemaining"
              value={taskDetailModal.timeTrackingRemaining}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDesciption = () => {
    const jsxDescription = parse(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              initialValue={taskDetailModal.description}
              name="description"
              init={{
                height: 300,
                menubar: false,
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContentDes(content);
              }}
            />
            <div className="my-3">
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch({
                    type: CHANGE_TASK_MODAL,
                    name: "description",
                    value: contentDes,
                  });
                  setVisibleEditor(false);
                }}
              >
                SAVE
              </button>
              <button
                className="btn btn-outline-danger ml-2"
                onClick={() => {
                  dispatch({
                    type: CHANGE_TASK_MODAL,
                    name: "description",
                    value: historyDes,
                  });
                  setVisibleEditor(false);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditor(!visibleEditor);
              setHistoryDes(taskDetailModal.description);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeTaskModal(value, name));
    setProjectDetail();
  };

  return (
    <div>
      <div
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
      </div>
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
              <div className="task-title d-flex align-items-center">
                <p className="mr-2 text-warning font-weight-bold mb-0">
                  <i className="fas fa-bookmark"></i>
                </p>
                <select
                  className="custom-select"
                  name="typeId"
                  value={taskDetailModal.typeId}
                  onChange={handleChange}
                >
                  {taskType.map((ele, index) => {
                    return (
                      <option value={ele.id} key={index}>
                        {ele.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane mr-2" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link mr-2" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i
                  className="fa fa-trash-alt"
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    try {
                      await fetchRemoveTaskApi(taskDetailModal.taskId);
                      notification.success({
                        description: "Successfully !",
                      });
                      setProjectDetail()
                      document.querySelectorAll("#close").onClick = true
                    } catch (err) {
                      notification.error({
                        message: err.response.data.content,
                      });
                    }
                  }}
                />
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
                    <h3 className="font-weight-bold mt-3 mb-4">
                      {taskDetailModal.taskName}
                    </h3>
                    <div className="description">
                      <h6 className="text-warning font-weight-bold">
                        Description
                      </h6>
                      {renderDesciption()}
                    </div>
                    <div className="comment mt-3">
                      <h6 className="text-warning font-weight-bold mb-3">
                        Comment
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
                      <h6 className="text-warning font-weight-bold">STATUS</h6>
                      <select
                        className="custom-select"
                        name="statusId"
                        value={taskDetailModal.statusId}
                        onChange={
                          handleChange
                          // async (e) => {
                          //   try {
                          //     await fetchUpdatePriorityApi({
                          //       taskId: taskId,
                          //       priorityId: e.target.value,
                          //     });
                          //     notification.success({
                          //       description: "Successfully !",
                          //     });
                          //     setProjectDetail();
                          //   } catch (error) {
                          //     console.log(error);
                          //     notification.error({
                          //       message: error.response.data.content,
                          //     });
                          //   }
                          // }
                        }
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
                        ASSIGNEES
                      </h6>
                      <div>
                        {taskDetailModal.assigness?.map((ele, index) => {
                          return (
                            <div
                              className="item d-flex align-items-center my-1 mr-0"
                              style={{ width: "auto" }}
                              key={index}
                            >
                              <div className="avatar mr-2">
                                <img src={ele.avatar} alt="avatar" />
                              </div>
                              <p className="name">
                                {ele.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch(removeUserAssignessAction(ele.id));
                                  }}
                                />
                              </p>
                            </div>
                          );
                        })}
                        <div className="text-primary mt-2">
                          <Select
                            style={{ width: "100%" }}
                            optionFilterProp="label"
                            value="+ Add more"
                            options={projectDetail.members
                              ?.filter((user) => {
                                let index =
                                  taskDetailModal.assigness?.findIndex(
                                    (mem) => mem.id === user.userId
                                  );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((user, index) => {
                                return { value: user.userId, label: user.name };
                              })}
                            onSelect={(value) => {
                              if (value === "0") {
                                return;
                              }
                              let userSelected = projectDetail.members?.find(
                                (mem) => mem.userId == value
                              );
                              userSelected = {
                                ...userSelected,
                                id: userSelected.userId,
                              };
                              dispatch(changeAssignessModal(userSelected));
                            }}
                          ></Select>
                        </div>
                      </div>
                    </div>
                    <div className="priority" style={{ margin: "20px 0" }}>
                      <h6 className="text-warning font-weight-bold">
                        PRIORITY
                      </h6>
                      <select
                        className="custom-select"
                        value={taskDetailModal.priorityId}
                        onChange={handleChange}
                        name="priorityId"
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
                        ORIGINAL ESTIMATE (HOURS)
                      </h6>
                      <input
                        type="number"
                        className="estimate-hours"
                        value={taskDetailModal.originalEstimate}
                        onChange={handleChange}
                        name="originalEstimate"
                        min={0}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6 className="text-warning font-weight-bold">
                        TIME TRACKING
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
