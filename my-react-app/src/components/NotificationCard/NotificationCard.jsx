import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterIcon from "../images/filter.svg";
import ClientProfileImg from "../images/clientProfile.svg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useWindowSize } from "../Utils/windowResize";

const NotificationTile = () => {
  return (
    <div className="flex space-x-4 sm:space-x-6 w-11/12 mx-auto ">
      <span>
        <img src={ClientProfileImg} className="size-12 sm:size-16" alt="profile" />
      </span>
      <span className="flex flex-col space-y-2">
        <span className="text-sm">Client has submitted program form</span>
        <span className="flex items-center space-x-1 text-[12px]">
          <CalendarMonthIcon className="size-2 text-[#5BC4BF]" />
          <span className="text-[#5BC4BF]">22 Mar 2024</span>
          <span>|</span>
          <AccessTimeIcon className="size-2 text-[#1F4B51]" />
          <span className="text-[#1F4B51]">10:30 A.M</span>
        </span>
        <button className="bg-[#5BC4BF] text-xs text-white px-3 sm:px-4 py-1.5 w-fit rounded-sm" id="notification-details">
          Details
        </button>
      </span>
    </div>
  );
};

function NotificationCard() {

  const {width} = useWindowSize();

  return (
    <div className="bg-white rounded-md shadow-md xl:w-full min-[320px]:w-full">
      <div className="flex justify-between items-center px-6 !pt-6 sm:pt-2">
        <div className="text-xl flex items-center space-x-3 font-medium py-1">
          <div id="notificationsLabel">Notifications</div>
          <img src={FilterIcon} className="size-4" alt="filter" />
        </div>
        <button>
        <MoreVertIcon sx={{
          fontSize: width > 600 ? "25px" : "20px",
        }} />
        </button>
      </div>
      <hr className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col space-y-7 py-4 items-center">
        <NotificationTile />
        <NotificationTile />
        <NotificationTile />
      </div>
    </div>
  );
}

export default NotificationCard;
