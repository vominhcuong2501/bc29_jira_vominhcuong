import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Slider,
  Select,
  InputNumber,
  notification,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import { closeEditModalAction } from "../../store/actions/modalEditAction";
import "./form-create-task.scss";
import { useAsync } from "../../hooks/useAsync";
import { fetchGetAllProjectApi } from "../../services/project";
import { getAllProjectAction } from "../../store/actions/projectAction";
import {
  fetchGetPriorityApi,
  fetchGetStatusApi,
  fetchGetTaskTypeApi,
} from "../../services/cyberbugs";
import { getUserByProjectApi } from "../../services/user";
import { getUserByProjectAction } from "../../store/actions/userAction";
import { selectedUserTaskAction } from "../../store/actions/taskAction";
import { useNavigate } from "react-router-dom";
import { fetchCreateTaskApi } from "../../services/task";

const children = [];

export default function FormCreateTask() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [size, setSize] = useState("middle");

  const { arrProject } = useSelector((state) => state.projectReducer);

  const { userByProject } = useSelector((state) => state.userReducer);

  const { selectedUser } = useSelector((state) => state.taskReducer);

  const editorRef = useRef(null);

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  useEffect(() => {
    fetchGetAllProject();
  }, []);
  const fetchGetAllProject = async () => {
    const result = await fetchGetAllProjectApi();
    dispatch(getAllProjectAction(result.data.content));
  };

  const { state: status = [] } = useAsync({
    service: () => fetchGetStatusApi(),
  });
  const { state: priority = [] } = useAsync({
    service: () => fetchGetPriorityApi(),
  });
  const { state: taskType = [] } = useAsync({
    service: () => fetchGetTaskTypeApi(),
  });

  const userOption = userByProject.map((ele) => {
    return { value: ele.userId, label: ele.name };
  });

  const handleSubmit = async (values) => {
    const task = {
      ...values,
      description: editorRef.current.getContent(),
      listUserAsign: selectedUser,
    };
    try {
      await fetchCreateTaskApi(task);
      dispatch(closeEditModalAction());
      notification.success({
        description: "Successfully !",
      });
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column mt-3 justify-content-center align-items-center ">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          projectId: "",
          taskName: "",
          statusId: "",
          priorityId: "",
          typeId: "",
          listUserAsign: [],
          timeTrackingSpent: 0,
          timeTrackingRemaining: 0,
          originalEstimate: 0,
        }}
      >
        <div className="row">
          <div className="col-12">
            <Form.Item
              name="projectId"
              label="Project"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your project !",
                },
              ]}
            >
              <Select
                size="large"
                onChange={async (projectId) => {
                  const result = await getUserByProjectApi(projectId);
                  dispatch(getUserByProjectAction(result.data.content));
                }}
              >
                {arrProject?.map((ele, index) => {
                  return (
                    <Select.Option value={ele.id} key={index}>
                      {ele.projectName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item
              name="taskName"
              label="Task name"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your task name !",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item
              name="statusId"
              label="Status"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your status !",
                },
              ]}
            >
              <Select size="large">
                {status.map((ele, index) => {
                  return (
                    <Select.Option value={ele.statusId} key={index}>
                      {ele.statusName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6 col-12">
            <Form.Item
              name="priorityId"
              label="Priority"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your priority !",
                },
              ]}
            >
              <Select size="large">
                {priority.map((ele, index) => {
                  return (
                    <Select.Option value={ele.priorityId} key={index}>
                      {ele.priority}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6 col-12">
            <Form.Item
              name="typeId"
              label="Task type"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your task type !",
                },
              ]}
            >
              <Select size="large">
                {taskType.map((ele, index) => {
                  return (
                    <Select.Option value={ele.id} key={index}>
                      {ele.taskType}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6 col-12">
            <span>
              <i
                style={{ fontSize: "7px", color: "#f96628" }}
                className="fas fa-asterisk mr-1"
              ></i>
            </span>
            <span>Assignees</span>
            <Select
              mode="multiple"
              size={size}
              placeholder="Please search user"
              optionFilterProp="label"
              onChange={(values) => {
                dispatch(selectedUserTaskAction(values));
              }}
              name="listUserAsign"
              options={userOption}
              style={{
                width: "100%",
              }}
            >
              {children}
            </Select>
          </div>
          <div className="col-md-6 col-12">
            <Form.Item label="Time checking" validateTrigger={["onChange"]}>
              <Slider
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="d-flex justify-content-between">
                <p className="m-0 font-weight-bold">
                  {timeTracking.timeTrackingSpent}h logged
                </p>
                <p className="m-0 font-weight-bold">
                  {timeTracking.timeTrackingRemaining}h remaining
                </p>
              </div>
            </Form.Item>
          </div>
          <div className="col-md-6 col-12 ">
            <Form.Item
              name="originalEstimate"
              label="Original estimate"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your task original estimate",
                },
              ]}
            >
              <InputNumber type="number" size="large" />
            </Form.Item>
          </div>
          <div className="col-md-3 col-12 p-0">
            <Form.Item
              name="timeTrackingSpent"
              label="Time spent"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your task time spent ",
                },
              ]}
            >
              <InputNumber
                type="number"
                min={0}
                size="large"
                onChange={(value) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="col-md-3 col-12 p-0">
            <Form.Item
              name="timeTrackingRemaining"
              label="Time remaining"
              validateTrigger={["onChange"]}
              rules={[
                {
                  required: true,
                  message: "Please input your task time remaining ",
                },
              ]}
            >
              <InputNumber
                type="number"
                min={0}
                size="large"
                onChange={(value) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="col-12">
            <span>
              <i
                style={{ fontSize: "7px", color: "#f96628" }}
                className="fas fa-asterisk mr-1"
              ></i>
            </span>
            <span>Description</span>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
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
            />
          </div>
        </div>
        <Form.Item className="text-right">
          <Button
            className="mt-4 text-light"
            style={{ backgroundColor: "#065fd4" }}
            htmlType="submit"
          >
            Create task
          </Button>
          <Button
            className="mt-4 ml-2 bg-light"
            style={{ backgroundColor: "#white" }}
            onClick={() => dispatch(closeEditModalAction())}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}
