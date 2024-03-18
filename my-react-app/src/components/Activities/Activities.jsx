import React from "react";
import AvatarImg from "../images/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ActivityItem = () => {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <img src={AvatarImg} alt="avatar" />
        <div className="space-y-1">
          <div className="text-sm">John Doe completed the program</div>
          <div className="text-xs py-1">Program Name: ECM</div>
          <div className="text-xs">15 mins ago</div>
        </div>
      </div>
      <button>
        <MoreVertIcon className="size-4" />
      </button>
    </div>
  );
};

function Activities() {
  return (
    <div className="bg-white w-full rounded-md shadow-sm md:max-xl:">
      <div className="flex justify-between items-center px-6 my-2">
        <div className="text-lg font-medium">Activities</div>
        <button>
          <MoreVertIcon className="size-4" />
        </button>
      </div>
      <hr className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col justify-between gap-y-6 mx-3 my-8">
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
      </div>
    </div>
  );
}

export default Activities;
