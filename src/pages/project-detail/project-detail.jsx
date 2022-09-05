import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/main/main-content";
import MainHeader from "../../components/main/main-header";
import MainInfo from "../../components/main/main-info";
import { fetchGetProjectDetailApi } from "../../services/project";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailAction } from "../../store/actions/projectAction";
import { notification } from "antd";

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
      notification.success({
        description: "Successfully !"
      })
    } catch (error) {
      notification.error({
        message: error.response.data.content
      });
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
