import React from "react";
import { Link } from "react-router-dom";
import BackArrowIcon from "../images/back-arrow.svg";
import ProgramListTable from "./ProgramListTable";
import PageTitle from "../PageTitle/PageTitle";

function ProgramDirectory() {
  return (
    <div className="flex flex-column gap-2 items-center">
      <PageHeader title="Program List" />

      <div className="flex flex-column gap-2 w-100 shadow-md rounded-md">
        <ProgramListTable />
      </div>
    </div>
  );
}

function PageHeader({ title }) {
  return (
    <div className="flex justify-between items-center w-100 mb-4">
      <p className="m-0 p-0 text-[20px] font-medium">{title}</p>
      <Link className="p-2 bg-[#EAECEB]" to="/">
        <img
          src={BackArrowIcon}
          alt="back arrow"
          className="h-[15px] w-[100%]"
        />
      </Link>
    </div>
  );
}

export default ProgramDirectory;