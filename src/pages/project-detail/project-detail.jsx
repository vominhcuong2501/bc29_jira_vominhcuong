import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/main/main-content";
import MainHeader from "../../components/main/main-header";
import MainInfo from "../../components/main/main-info";
import { fetchGetProjectDetailApi } from "../../services/project";
import { useAsync } from "../../hooks/useAsync";

export default function ProjectDetail() {
  const params = useParams();

  const { state: projectDetail = {} } = useAsync({
    service: () => fetchGetProjectDetailApi(params.projectId),
  });

  return (
    <div className="main">
      <MainHeader projectName={projectDetail.projectName} />
      <MainInfo projectDetail={projectDetail} />
      <MainContent projectDetail={projectDetail} />
    </div>
  );
}
