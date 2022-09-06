import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetProjectDetailApi } from "../../services/project";
import { fetchTaskDetailApi, fetchUpdateStatusApi } from "../../services/task";
import { getProjectDetailAction } from "../../store/actions/projectAction";
import { getTaskDetailAction } from "../../store/actions/taskAction";
import "./main.scss"

export default function MainContent(props) {
  const dispatch = useDispatch();

  const params = useParams();

  const { lstTask } = props.projectDetail;

  const setProjectDetail = async () => {
    const result = await fetchGetProjectDetailApi(params.projectId);
    dispatch(getProjectDetailAction(result.data.content));
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    fetchUpdateStatusApi({
      taskId: Number(draggableId),
      statusId: destination.droppableId,
    });
    setProjectDetail();
  };

  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {lstTask?.map((ele, index) => {
          return (
            <Droppable droppableId={ele.statusId} key={ele.statusId} className="col-lg-4 col-md-6 col-12">
              {(provided) => {
                return (
                  <div
                    className="card mt-3"
                    style={{ height: "auto", width: "17rem" }}
                  >
                    <div className="card-header">{ele.statusName}</div>
                    <div
                      className="list-group list-group-flush"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      style={{ height: "100%" }}
                    >
                      {ele.lstTaskDeTail.map((ele, index) => {
                        return (
                          <Draggable
                            key={ele.taskId.toString()}
                            draggableId={ele.taskId.toString()}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  onClick={async () => {
                                    const result = await fetchTaskDetailApi(
                                      ele.taskId
                                    );
                                    dispatch(
                                      getTaskDetailAction(result.data.content)
                                    );
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
                                      <p className="text-danger">
                                        {ele.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {ele.assigness.map((ele) => {
                                          return (
                                            <div
                                              className="avatar"
                                              key={ele.id}
                                            >
                                              <img
                                                src={ele.avatar}
                                                alt={ele.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="container p-0">
      <div className="content row" style={{ display: "flex", justifyContent: "center" }}>
        {renderCardTaskList()}
      </div>
    </div>
  );
}
