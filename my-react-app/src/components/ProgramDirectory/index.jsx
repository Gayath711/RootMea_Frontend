import React from "react";

import BackArrowIcon from "../images/back-arrow.svg";

function ProgramDirectory() {
  return (
    <div className="flex flex-column gap-2 items-center">
      <PageHeader title="Program List" />
      <div className="w-100 shadow-md rounded-md">ProgramDirectory</div>
    </div>
  );
}

function PageHeader({ title }) {
  return (
    <div className="flex justify-between items-center w-100">
      <p className="m-0 p-0 text-[20px] font-medium">{title}</p>
      <button
        className="p-2 bg-[#EAECEB]"
        onClick={() => {
          alert("back");
        }}
      >
        <img
          src={BackArrowIcon}
          alt="back arrow"
          className="h-[15px] w-[100%]"
        />
      </button>
    </div>
  );
}

export default ProgramDirectory;
