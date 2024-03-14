import React, { useState, useEffect, useMemo } from "react";
import SideBar from "./SideBar/SideBar";
import DashboardMainArea from "./DashboardMainArea/DashboardMainArea";
import Panel from "./Panel/Panel";

function ClientProfileLandingPage({ onLogout }) {
  return (
    <div className="flex justify-between pr-10">
      <div className="w-[4%]">
        <SideBar />
      </div>
      <div className="w-[66%]">
        <DashboardMainArea />
      </div>
      <div className="w-[27%]">
        <Panel />
      </div>
    </div>
  );
}

export default ClientProfileLandingPage;
