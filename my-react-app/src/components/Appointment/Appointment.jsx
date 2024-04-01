import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./AppointmentStyles.css";

const AppointmentItem = () => {
  return (
    <div className="flex justify-between gap-x-2">
      <div className="flex gap-3">
        <div id="appointment-5" className="flex flex-col justify-center items-center w-[40px] h-[40px] sm:w-12 sm:h-12 bg-[#89D6DE] text-white">
          <span className="text-[14px] sm:text-base">07</span>
          <span className="text-[8px] sm:text-base">Mar</span>
        </div>
        <div id="appointment-6" className="space-y-0.5">
          <div className="text-[13px] sm:text-sm font-medium">New appointment with client</div>
          <div className="text-[11px] sm:text-xs py-1">Created by: User Name</div>
          <div className="text-[9px] sm:text-xs">10 A.M to 11 A.M</div>
        </div>
      </div>
      <button className="px-2.5 sm:px-4 py-1.5 rounded-sm text-white h-fit w-fit bg-[#43B09C] text-[10px] sm:text-xs font-medium">
        Details
      </button>
    </div>
  );
};

function Appointment() {
  return (
    <div className="bg-white w-full rounded-md shadow-md sm:col-span-8">
      <div className="flex justify-between items-center mx-3 sm:mx-6 mt-6 mb-2">
        <div id="appointment-1" className="text-lg font-medium">Upcoming</div>
        <button id="appointment-2" className="flex justify-center items-center space-x-1 bg-[#5BC4BF] text-white px-2.5 py-1 sm:py-1.5 my-1.5 sm:my-0 text-xs rounded-sm">
          <AddCircleIcon id="appointment-3" className="text-white size-3 sm:size-4" />
          <span className="text-[10px] sm:text-xs">New Appointment</span>
        </button>
      </div>
      <hr id="appointment-4" className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col justify-between space-y-6 mx-3 my-8">
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
      </div>
    </div>
  );
}

export default Appointment;
