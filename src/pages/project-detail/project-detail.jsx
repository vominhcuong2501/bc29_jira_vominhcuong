import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/main/main-content";
import MainHeader from "../../components/main/main-header";
import MainInfo from "../../components/main/main-info";
import { fetchGetProjectDetailApi } from "../../services/project";
import { useAsync } from "../../hooks/useAsync";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getProjectDetailAction } from "../../store/actions/projectAction";

export default function ProjectDetail() {
  
  const params = useParams();

  const dispatch = useDispatch();

  const { projectDetail } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    fetchGetProjectDetail();
  }, []);

  const fetchGetProjectDetail = async () => {
    try {
      const result = await fetchGetProjectDetailApi(params.projectId);
      dispatch(getProjectDetailAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <MainHeader projectName={projectDetail.projectName} />
      <MainInfo projectDetail={projectDetail} />
      <MainContent projectDetail={projectDetail} />
    </div>
  );
}
