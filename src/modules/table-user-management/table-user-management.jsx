import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, notification, Space, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchDeleteUserApi, getUserListApi } from "../../services/user";
import { getUserListAction } from "../../store/actions/userAction";
import { LoadingContext } from "../../contexts/loading.context";
import { NavLink, useNavigate } from "react-router-dom";
import "./table-user-management.scss";
import { openFormEditProjectAction, openFormEditUserAction } from "../../store/actions/modalEditAction";

export default function TableManagement() {
  const [value, setValue] = useState();

  const dispatch = useDispatch();

  const { arrUser } = useSelector((state) => state.userReducer);

  const { userSearch } = useSelector((state) => state.userReducer);

  const [loadingState, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    fetchGetUserList();
  }, []);

  // call api render table
  const fetchGetUserList = async () => {
    setLoadingState({ isLoading: true });
    const result = await getUserListApi();
    setLoadingState({ isLoading: false });
    dispatch(getUserListAction(result.data.content));
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

  const fetchDeleteProject = async (userId) => {
    try {
      await fetchDeleteUserApi(userId);
      notification.success({
        description: "Successfully !",
      });
      fetchGetUserList();
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.response.data.content,
      });
    }
  };

  // const fetchProjectEdit = async (id) => {
  //   const result = await fetchGetProjectDetailApi(id);
  //   dispatch(getProjectEditAction(result.data.content));
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      ...getColumnSearchProps("id"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => item2.userId - item1.userId,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => {
        let name1 = item1.name?.trim().toLowerCase();
        let name2 = item2.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sortDirections: ["descend"],
      sorter: (item2, item1) => {
        let email1 = item1.email?.trim().toLowerCase();
        let email2 = item2.email?.trim().toLowerCase();
        if (email1 < email2) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
            onClick={() => fetchDeleteProject(record.userId)}
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
        rowKey={"userId"}
        columns={columns}
        dataSource={arrUser}
      />
    </div>
  );
}
