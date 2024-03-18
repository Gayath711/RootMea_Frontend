import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterIcon from "../images/filter.svg";
import ClientProfileImg from "../images/clientProfile.svg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const NotificationTile = () => {
  return (
    <div className="flex space-x-6 w-11/12 mx-auto ">
      <span>
        <img src={ClientProfileImg} className="size-16" alt="profile" />
      </span>
      <span className="flex flex-col space-y-2">
        <span className="text-sm">New client added this panel</span>
        <span className="flex items-center space-x-1 text-[10px]">
          <CalendarMonthIcon className="size-2 text-[#5BC4BF]" />
          <span className="text-[#5BC4BF]">22 Mar 2024</span>
          <span>|</span>
          <AccessTimeIcon className="size-2 text-[#1F4B51]" />
          <span className="text-[#1F4B51]">10:30 A.M</span>
        </span>
        <button className="bg-[#5BC4BF] text-xs text-white px-3 py-1 w-fit rounded-sm">
          Details
        </button>
      </span>
    </div>
  );
};

function NotificationCard() {
  return (
    <div className="bg-white rounded-md shadow-md xl:w-full min-[320px]:w-full">
      <div className="flex justify-between items-center px-6 my-2">
        <div className="text-lg flex items-center space-x-3 font-medium py-1">
          <div>Notifications</div>
          <img src={FilterIcon} className="size-4" alt="filter" />
        </div>
        <button>
          <MoreVertIcon className="size-2" />
        </button>
      </div>
      <hr className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col space-y-4 py-4 items-center">
        <NotificationTile />
        <NotificationTile />
        <NotificationTile />
      </div>
    </div>
  );
}

export default NotificationCard;
