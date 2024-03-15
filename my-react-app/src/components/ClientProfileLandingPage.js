import React, { useState, useEffect, useMemo } from "react";
import SideBar from "./SideBar/SideBar";
import DashboardMainArea from "./DashboardMainArea/DashboardMainArea";
import Panel from "./Panel/Panel";
import AppointmentCalendar from "./AppointmentCalendar/AppointmentCalendar";

function ClientProfileLandingPage({ onLogout }) {
  return (
    <div className="flex justify-between pr-10">
      <div id="sideBar" className="w-[4%]">
        <SideBar />
      </div>
      <div className="w-[94%] py-12 space-y-7">
        <div className="flex justify-between">
          <div className="w-[70%]">
            <DashboardMainArea />
          </div>
          <div className="w-[28%]">
            <Panel />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[49%]">
              <AppointmentCalendar />
          </div>
          <div className="w-[49%]">
              <AppointmentCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfileLandingPage;
