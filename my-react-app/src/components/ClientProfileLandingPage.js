import React from "react";
import SideBar from "./SideBar/SideBar";
import DashboardMainArea from "./DashboardMainArea/DashboardMainArea";
import Panel from "./Panel/Panel";
import AppointmentCalendar from "./AppointmentCalendar/AppointmentCalendar";
import { useWindowSize } from "./Utils/windowResize";
import Encounters from "./Encounters/Encounters";

function ClientProfileLandingPage({ onLogout }) {
  const { width } = useWindowSize();

  return (
    <div className="flex justify-between pr-10">
      <div id="sideBar" className="w-[4%]">
        <SideBar />
      </div>
      <div className="w-[94%] py-12 space-y-7">
        <div className="min-[320px]:flex-col xl:flex-row flex justify-between">
          <div className=" min-[320px]:w-[100%] xl:w-[70%]">
            <DashboardMainArea />
          </div>
          {width > 1280 && (
            <div className="w-[28%]">
              <Panel />
            </div>
           )} 
        </div>
        <div className="flex justify-between gap-4 min-[320px]:flex-col xl:flex-row">
          <div className="xl:w-[49%] min-[320px]:w-[100%]">
            {/* <AppointmentCalendar /> */}
          </div>
          <div className="xl:w-[49%] min-[320px]:w-[100%]">
              {/* <Encounters /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfileLandingPage;
