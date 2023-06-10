import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchGetPriorityApi,
  fetchGetStatusApi,
  fetchGetTaskTypeApi,
} from "../../services/cyberbugs";
import parse from "html-react-parser";
import {
  changeTaskModal,
  getTaskDetailAction,
  selectedUserTaskAction,
} from "../../store/actions/taskAction";
import { Editor } from "@tinymce/tinymce-react";
import { CHANGE_TASK_MODAL } from "../../store/types/taskType";
import { fetchGetProjectDetailApi } from "../../services/project";
import { getProjectDetailAction } from "../../store/actions/projectAction";
import { Select, notification, Space, Input } from "antd";
import {
  fetchRemoveTaskApi,
  fetchTaskDetailApi,
  fetchUpdateDesciptionApi,
  fetchUpdateEstimateApi,
  fetchUpdatePriorityApi,
  fetchUpdateStatusApi,
  fetchUpdateTaskDetailApi,
  fetchUpdateTimeTrackingApi,
} from "../../services/task";
import {
  fetchCommentApi,
  fetchDeleteCommentApi,
  fetchGetCommentApi,
  fetchUpdateCommentApi,
} from "../../services/comment";

export default function TaskDetailModal() {
  const { Search } = Input;

  const dispatch = useDispatch();

  const { taskDetailModal } = useSelector((state) => state.taskReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);

  const [visibleTaskName, setVisibleTaskName] = useState(false);

  const [visibleComment, setVisibleComment] = useState();

  const [content, setContent] = useState(taskDetailModal.description);

  const [newTaskName, setNewTaskName] = useState();

  const [typeId, setTypeId] = useState();

  const [searchTask, setSearchTask] = useState([]);

  const [user, setUser] = useState();

  const [comment, setComment] = useState();

  const [commentId, setCommentId] = useState(0);

  const [commentEdit, setCommentEdit] = useState();

  const { projectDetail } = useSelector((state) => state.projectReducer);

  const userOption = projectDetail.members?.map((ele) => {
    return { value: ele.userId, label: ele.name };
  });

  const assign = taskDetailModal.assigness?.map((userId) => {
    return userId.id;
  });

  useEffect(() => {
    setUser(
      taskDetailModal.assigness?.map((ele) => {
        return { value: ele.id, label: ele.name };
      })
    );
    setNewTaskName(taskDetailModal.taskName);
    setTypeId(taskDetailModal.typeId);
  }, [taskDetailModal]);

  const { state: status = [] } = useAsync({
    service: () => fetchGetStatusApi(),
  });

  const { state: priority = [] } = useAsync({
    service: () => fetchGetPriorityApi(),
  });

  const { state: taskType = [] } = useAsync({
    service: () => fetchGetTaskTypeApi(),
  });

  const { state: commentList = [] } = useAsync({
    service: () => fetchGetCommentApi(taskDetailModal.taskId),
    dependencies: [taskDetailModal],
  });

  const setProjectDetail = async () => {
    const result = await fetchGetProjectDetailApi(taskDetailModal.projectId);
    dispatch(getProjectDetailAction(result.data.content));
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
              onChange={async (e) => {
                const { value, name } = e.target;
                dispatch(changeTaskModal(value, name));
                try {
                  await fetchUpdateTimeTrackingApi({
                    taskId: taskDetailModal.taskId,
                    timeTrackingSpent: value,
                    timeTrackingRemaining:
                      taskDetailModal.timeTrackingRemaining,
                  });
                  notification.success({
                    description: "Successfully !",
                  });
                  setProjectDetail();
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              min={0}
              className="form-control"
              name="timeTrackingRemaining"
              value={taskDetailModal.timeTrackingRemaining}
              onChange={async (e) => {
                const { value, name } = e.target;
                dispatch(changeTaskModal(value, name));
                try {
                  await fetchUpdateTimeTrackingApi({
                    taskId: taskDetailModal.taskId,
                    timeTrackingRemaining: value,
                    timeTrackingSpent: taskDetailModal.timeTrackingSpent,
                  });
                  notification.success({
                    description: "Successfully !",
                  });
                  setProjectDetail();
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
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
                setContent(content);
              }}
            />
            <div className="my-3">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  dispatch({
                    type: CHANGE_TASK_MODAL,
                    name: "description",
                    value: content,
                  });
                  try {
                    await fetchUpdateDesciptionApi({
                      taskId: taskDetailModal.taskId,
                      description: content,
                    });
                    notification.success({
                      description: "Successfully !",
                    });
                    setProjectDetail();
                  } catch (error) {
                    notification.error({
                      message: error.response.data.content,
                    });
                  }
                  setVisibleEditor(false);
                }}
              >
                SAVE
              </button>
              <button
                className="btn btn-outline-danger ml-2"
                onClick={() => {
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
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const onSearch = (value) => {
    let search = projectDetail.lstTask?.map((ele) => {
      return ele.lstTaskDeTail.filter((ele) => {
        return (
          ele.taskName
            .toLowerCase()
            .trim()
            .indexOf(value.toLowerCase().trim()) !== -1
        );
      });
    });

    if (search) {
      setSearchTask(search);
    }
  };

  return (
    <div>
      {/* search task  */}
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
              <Space direction="vertical">
                <Search
                  placeholder="Enter task name"
                  onSearch={onSearch}
                  enterButton
                  name="keyword"
                  allowClear
                />
              </Space>
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
              <p>
                {projectDetail.projectName
                  ? `Tasks in ${projectDetail.projectName}`
                  : "Please choose a project and search task in that project !!!"}
              </p>
              {searchTask?.map((ele) => {
                return ele?.map((ele, index) => {
                  return (
                    <div
                      style={{ display: "flex" }}
                      key={index}
                      data-toggle="modal"
                      data-target="#infoModal"
                      onClick={async () => {
                        const result = await fetchTaskDetailApi(ele.taskId);
                        dispatch(getTaskDetailAction(result.data.content));
                      }}
                    >
                      {ele.taskTypeDetail.id === 1 ? (
                        <div className="icon">
                          <i
                            className="fas fa-exclamation text-danger"
                            style={{ marginRight: 6 }}
                          ></i>
                        </div>
                      ) : (
                        <div className="icon">
                          <i className="fa fa-bookmark" />
                        </div>
                      )}

                      <div>
                        <p>{ele.taskName}</p>
                        <p style={{ fontSize: 13 }}>
                          {ele.taskTypeDetail?.taskType}
                        </p>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>

      {/* modal task detail  */}
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
              {/* task type */}
              <div className="taskType task-title d-flex align-items-center">
                <p className="mr-2 text-warning font-weight-bold mb-0">
                  <i className="fas fa-tasks text-danger"></i>
                </p>
                <select
                  className="custom-select"
                  name="typeId"
                  value={typeId}
                  onChange={async (e) => {
                    setTypeId(e.target.value);
                    dispatch({
                      type: CHANGE_TASK_MODAL,
                      name: "typeId",
                      value: e.target.value,
                    });
                    try {
                      await fetchUpdateTaskDetailApi({
                        ...taskDetailModal,
                        typeId: e.target.value,
                        listUserAsign: assign,
                      });
                      notification.success({
                        description: "Successfully !",
                      });
                      setProjectDetail();
                    } catch (error) {
                      notification.error({
                        message: error.response.data.content,
                      });
                    }
                  }}
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

              {/* delete task  */}
              <div
                className="delete-task task-click"
                style={{ display: "flex" }}
              >
                <i
                  className="fa fa-trash-alt"
                  style={{ cursor: "pointer" }}
                  title="Delete task"
                  onClick={async () => {
                    try {
                      await fetchRemoveTaskApi(taskDetailModal.taskId);
                      notification.success({
                        description: "Successfully !",
                      });
                      document.getElementById("close").click();
                      setProjectDetail();
                    } catch (error) {
                      notification.error({
                        message: error.response.data.content,
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
                  <div className="col-lg-8 col-12">
                    {/* task name  */}
                    <h3 className="taskName font-weight-bold mt-3 mb-4">
                      {visibleTaskName ? (
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={newTaskName}
                            onChange={(e) => {
                              setNewTaskName(e.target.value);
                            }}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-success"
                              onClick={async () => {
                                dispatch({
                                  type: CHANGE_TASK_MODAL,
                                  value: newTaskName,
                                  name: "taskName",
                                });
                                try {
                                  await fetchUpdateTaskDetailApi({
                                    ...taskDetailModal,
                                    taskName: newTaskName,
                                    listUserAsign: assign,
                                  });
                                  notification.success({
                                    description: "Successfully !",
                                  });
                                  setProjectDetail();
                                } catch (error) {
                                  notification.error({
                                    message: error.response.message,
                                  });
                                }
                                setVisibleTaskName(false);
                              }}
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button className="btn btn-outline-danger">
                              <i
                                onClick={() => {
                                  setVisibleTaskName(false);
                                }}
                                className="fas fa-times"
                              ></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setVisibleTaskName(!visibleTaskName)}
                        >
                          {taskDetailModal.taskName}
                        </div>
                      )}
                    </h3>

                    {/* description task  */}
                    <div className="description">
                      <h6 className="text-warning font-weight-bold">
                        Description
                      </h6>
                      {renderDesciption()}
                    </div>

                    {/* comment task  */}
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
                        <div className="input-comment input-group mb-3 ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Comment ..."
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-primary"
                              onClick={async () => {
                                try {
                                  await fetchCommentApi({
                                    taskId: taskDetailModal.taskId,
                                    contentComment: comment,
                                  });
                                  notification.success({
                                    description: "Successfully !",
                                  });
                                  dispatch({
                                    type: CHANGE_TASK_MODAL,
                                    value: commentList,
                                    name: "lstComment",
                                  });
                                  setProjectDetail();
                                } catch (error) {
                                  notification.error({
                                    message: error.response.data.content,
                                  });
                                }
                              }}
                            >
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          {commentList?.map((ele) => {
                            return (
                              <div
                                className="display-comment"
                                style={{ display: "flex" }}
                                key={ele.id}
                              >
                                <div className="avatar">
                                  <img
                                    src={ele.user.avatar}
                                    alt={ele.user.avatar}
                                  />
                                </div>
                                <div style={{ width: "100%" }}>
                                  <p style={{ marginBottom: 5, color: "blue" }}>
                                    {ele.user.name}
                                  </p>
                                  {visibleComment && ele.id === commentId ? (
                                    <div className="input-comment input-group mb-3 ">
                                      <input
                                        name="lstComment"
                                        type="text"
                                        className="form-control"
                                        defaultValue={ele.contentComment}
                                        onChange={(e) => {
                                          setCommentEdit(e.target.value);
                                        }}
                                      />
                                      <div className="input-group-append">
                                        <button
                                          className="btn btn-outline-primary"
                                          onClick={async () => {
                                            try {
                                              await fetchUpdateCommentApi(
                                                commentId,
                                                commentEdit
                                              );
                                              notification.success({
                                                description: "Successfully !",
                                              });
                                              dispatch({
                                                type: CHANGE_TASK_MODAL,
                                                value: [...commentList],
                                                name: "lstComment",
                                              });
                                              setVisibleComment(false);
                                              setProjectDetail();
                                            } catch (error) {
                                              notification.error({
                                                message:
                                                  error.response.data.content,
                                              });
                                            }
                                          }}
                                        >
                                          <i className="fas fa-paper-plane"></i>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-flex justify-content-between">
                                      <p style={{ marginBottom: 5 }}>
                                        {ele.contentComment}
                                      </p>
                                      <div>
                                        <a
                                          className="text-success mr-2"
                                          title="Edit"
                                          onClick={() => {
                                            setVisibleComment(!visibleComment);
                                            setCommentId(ele.id);
                                          }}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </a>
                                        <a
                                          className="text-danger"
                                          title="Delete"
                                          onClick={async () => {
                                            try {
                                              await fetchDeleteCommentApi(
                                                ele.id
                                              );
                                              notification.success({
                                                description: "Successfully !",
                                              });
                                              dispatch({
                                                type: CHANGE_TASK_MODAL,
                                                value: commentList,
                                                name: "lstComment",
                                              });
                                              setProjectDetail();
                                            } catch (error) {
                                              notification.error({
                                                message:
                                                  error.response.data.content,
                                              });
                                            }
                                          }}
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-12">
                    {/* status task  */}
                    <div className="status">
                      <h6 className="text-warning font-weight-bold">STATUS</h6>
                      <select
                        className="custom-select"
                        name="statusId"
                        value={taskDetailModal.statusId}
                        onChange={async (e) => {
                          dispatch({
                            type: CHANGE_TASK_MODAL,
                            name: "statusId",
                            value: e.target.value,
                          });
                          try {
                            await fetchUpdateStatusApi({
                              taskId: taskDetailModal.taskId,
                              statusId: e.target.value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail();
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

                    {/* asignees task  */}
                    <div className="assignees">
                      <h6 className="text-warning font-weight-bold">
                        ASSIGNEES
                      </h6>
                      <div>
                        <div className="text-primary mt-2">
                          <Select
                            mode="multiple"
                            placeholder="Please search user"
                            optionFilterProp="label"
                            value={user}
                            onChange={async (values) => {
                              setUser(values);
                              try {
                                await fetchUpdateTaskDetailApi({
                                  ...taskDetailModal,
                                  listUserAsign: values,
                                });
                                notification.success({
                                  description: "Successfully !",
                                });
                                dispatch(selectedUserTaskAction(values));
                                setProjectDetail();
                              } catch (error) {
                                notification.error({
                                  message: error.response.data.content,
                                });
                              }
                            }}
                            name="listUserAsign"
                            options={userOption}
                            style={{
                              width: "100%",
                            }}
                          ></Select>
                        </div>
                      </div>
                    </div>

                    {/* priority task  */}
                    <div className="priority" style={{ margin: "20px 0" }}>
                      <h6 className="text-warning font-weight-bold">
                        PRIORITY
                      </h6>
                      <select
                        className="custom-select"
                        value={taskDetailModal.priorityId}
                        onChange={async (e) => {
                          dispatch({
                            type: CHANGE_TASK_MODAL,
                            name: "priorityId",
                            value: e.target.value,
                          });
                          try {
                            await fetchUpdatePriorityApi({
                              taskId: taskDetailModal.taskId,
                              priorityId: e.target.value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail();
                          } catch (error) {
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
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

                    {/* estimate time  */}
                    <div className="estimate">
                      <h6 className="text-warning font-weight-bold">
                        ORIGINAL ESTIMATE (HOURS)
                      </h6>
                      <input
                        type="number"
                        className="estimate-hours"
                        value={taskDetailModal.originalEstimate}
                        onChange={async (e) => {
                          const { value, name } = e.target;
                          dispatch(changeTaskModal(value, name));
                          try {
                            await fetchUpdateEstimateApi({
                              taskId: taskDetailModal.taskId,
                              originalEstimate: value,
                            });
                            notification.success({
                              description: "Successfully !",
                            });
                            setProjectDetail();
                          } catch (error) {
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
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
