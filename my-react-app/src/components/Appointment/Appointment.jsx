import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AppointmentItem = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center items-center w-12 h-12 bg-[#89D6DE] text-white">
        <span>07</span>
        <span>Mar</span>
      </div>
      <div className="">
        <div className="text-sm">New appointment with client</div>
        <div className="text-xs py-1">Created by: User Name</div>
        <div className="text-xs">10 A.M to 11 A.M</div>
      </div>
      <button className="px-4 py-1.5 rounded-sm text-white h-fit w-fit bg-[#43B09C] text-xs font-medium">
        Details
      </button>
    </div>
  );
};

function Appointment() {
  return (
    <div className="bg-white w-full rounded-md shadow-sm">
      <div className="flex justify-between items-center px-6 my-2">
        <div className="text-lg font-medium">Upcoming</div>
        <button className="flex justify-center items-center space-x-1 bg-[#5BC4BF] text-white px-1 py-1.5 text-xs rounded-sm">
          <AddCircleIcon className="text-white size-4" />
          <span className="text-xs">New Appointment</span>
        </button>
      </div>
      <hr className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col justify-between space-y-2 mx-3 my-8">
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
