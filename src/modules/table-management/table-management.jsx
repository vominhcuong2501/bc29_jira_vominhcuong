import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Input,
  notification,
  Space,
  Table,
  Tag,
  Popover,
  AutoComplete,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  assignUserProjectApi,
  fetchDeleteProjectApi,
  fetchGetAllProjectApi,
  fetchGetProjectDetailApi,
} from "../../services/project";
import { openFormEditUserAction } from "../../store/actions/modalEditAction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./table-management.scss";
import {
  getProjectEditAction,
  getTableAction,
} from "../../store/actions/projectAction";
import { getUserApi, removeUserProjectApi } from "../../services/user";
import { getUserAction } from "../../store/actions/userAction";
import { LoadingContext } from "../../contexts/loading.context";
import { NavLink, useNavigate } from "react-router-dom";

export default function TableManagement() {
  const [value, setValue] = useState();

  const dispatch = useDispatch();

  const { table } = useSelector((state) => state.projectReducer);

  const { userSearch } = useSelector((state) => state.userReducer);

  const [loadingState, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    fetchGetAllProject();
  }, []);

  // call api render table
  const fetchGetAllProject = async () => {
    setLoadingState({ isLoading: true });
    const result = await fetchGetAllProjectApi();
    setLoadingState({ isLoading: false });
    dispatch(getTableAction(result.data.content));
  };

  // các tính năng của table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const fetchDeleteProject = async (id) => {
    try {
      await fetchDeleteProjectApi(id);
      notification.success({
        description: "Successfully !",
      });
      fetchGetAllProject();
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.response.data.content,
      });
    }
  };

  const fetchProjectEdit = async (id) => {
    const result = await fetchGetProjectDetailApi(id);
    dispatch(getProjectEditAction(result.data.content));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => item2.id - item1.id,
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      ...getColumnSearchProps("projectName"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        } else {
          return 1;
        }
      },
      render: (text, record, index) => {
        return (
          <NavLink className="text-dark" to={`/project-detail/${record.id}`}>
            {text}
          </NavLink>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      ...getColumnSearchProps("categoryName"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName1 < categoryName2) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Creator",
      //   dataIndex: "creator",
      key: "creator",
      sortDirections: ["descend"],
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator1 < creator2) {
          return -1;
        } else {
          return 1;
        }
      },
      render: (_, record) => <Tag color="green">{record.creator?.name}</Tag>,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.member.length - b.member.length,
      render: (_, record) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((ele, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>UserId</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((ele, index) => {
                            return (
                              <tr key={index}>
                                <td>{ele.userId}</td>
                                <td>
                                  <img
                                    src={ele.avatar}
                                    alt={ele.avatar}
                                    width={30}
                                    height={30}
                                  />
                                </td>
                                <td>{ele.name}</td>
                                <td>
                                  <a
                                    title="Delete"
                                    className="text-danger"
                                    shape="circle"
                                    onClick={async () => {
                                      try {
                                        await removeUserProjectApi({
                                          projectId: record.id,
                                          userId: ele.userId,
                                        });
                                        notification.success({
                                          description: "Successfully !",
                                        });
                                        fetchGetAllProject();
                                      } catch (error) {
                                        notification.error({
                                          message: error.response.data.content,
                                        });
                                      }
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar src={ele.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="topLeft"
              title={<span>Add member</span>}
              content={() => {
                return (
                  <div>
                    <AutoComplete
                      // lấy dữ liệu từ reducer hiển thị hộp thoại user cần tìm
                      options={userSearch?.map((user, index) => {
                        return {
                          label: user.name,
                          value: user.userId.toString(),
                        };
                      })}
                      value={value}
                      // set lại giá trị của hộp thoại khi chọn không hiển thị value mà thay bằng label
                      onSelect={async (valueSelect, option) => {
                        setValue(option.label);
                        // gọi api gửi về backend
                        try {
                          await assignUserProjectApi({
                            projectId: record.id,
                            userId: Number(valueSelect),
                          });
                          notification.success({
                            description: "Successfully !",
                          });
                          fetchGetAllProject();
                        } catch (error) {
                          notification.error({
                            message: error.response.data.content,
                          });
                        }
                      }}
                      onChange={(text) => {
                        setValue(text);
                      }}
                      style={{ width: "100%" }}
                      onSearch={async (keyWord) => {
                        const result = await getUserApi(keyWord);
                        dispatch(getUserAction(result.data.content));
                      }}
                    />
                  </div>
                );
              }}
              trigger="click"
            >
              <Button shape="circle">+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            title="Edit"
            className="text-success"
            style={{ fontSize: 20 }}
            onClick={() => {
              dispatch(openFormEditUserAction());
              // fetchProjectEdit(record.id);
            }}
          >
            <EditOutlined />
          </a>
          <a
            title="Delete"
            className="text-danger"
            style={{ fontSize: 20 }}
            onClick={() => fetchDeleteProject(record.id)}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mx-5">
      <h3 className="my-3 font-weight-bold">Project management</h3>
      <Table
        className="table m-0"
        rowKey={"id"}
        columns={columns}
        dataSource={table}
      />
    </div>
  );
}
