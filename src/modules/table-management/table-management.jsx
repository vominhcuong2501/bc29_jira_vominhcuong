import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, notification, Space, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchDeleteProjectApi,
  fetchGetAllProjectApi,
  fetchProjectDetailApi,
} from "../../services/project";
import { openFormEditProjectAction } from "../../store/actions/modalEditAction";
import { useDispatch } from "react-redux/es/exports";
import "./table-management.scss";
import { useNavigate } from "react-router-dom";
import { getProjectDetail } from "../../store/actions/projectAction";
// import ReactHtmlParser from "react-html-parser"

export default function TableManagement() {
  const { state: data = [] } = useAsync({
    service: () => fetchGetAllProjectApi(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.response.data.content,
      });
    }
  };

  const fetchProjectDetail = async (id) => {
    const result = await fetchProjectDetailApi(id)
    console.log(result.data.content);
    dispatch(getProjectDetail(result.data.content))
  }

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
      render: (_, record) => <Tag color="green">{record.creator.name}</Tag>,
    },
    {
      title: "Members",
      //   dataIndex: "members",
      key: "members",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.member.length - b.member.length,
      render: (_, record) => (
        <img
          src={record.members.avatar}
          alt={record.members.avatar}
          width={30}
        />
      ),
    },
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = ReactHtmlParser(text)
    //     return <div>{jsxContent}</div>
    //   }
    //   },
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
              dispatch(openFormEditProjectAction());
              fetchProjectDetail(record.id)
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
        dataSource={data}
      />
    </div>
  );
}
