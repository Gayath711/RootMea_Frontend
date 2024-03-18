import React from "react";
import DashboardMainArea from "../../components/DashboardMainArea/DashboardMainArea";
import Panel from "../../components/Panel/Panel";
import { useWindowSize } from "../../components/Utils/windowResize";

function Dashboard({ onLogout }) {
  const { width } = useWindowSize();

  return (
    <>
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
    </>
  );
}

export default Dashboard;
