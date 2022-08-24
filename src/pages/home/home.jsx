import React from "react";
import MainContent from "../../components/main/main-content";
import MainHeader from "../../components/main/main-header";
import MainInfo from "../../components/main/main-info";

export default function Home() {
  return (
    <div className="main">
      <MainHeader />
      <MainInfo />
      <MainContent />
    </div>
  );
}
