import React, { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";
import EditIcon from "../images/edit.svg";

const options = {
  Pending: "bg-[#FFE5E5] text-[#E0382D]",
  Active: "bg-[#FEE4D0] text-[#F79421]",
  Done: "bg-[#E9FEFB] text-[#2F9384]",
};

const Tag = ({ text }) => {
  return (
    <div
      className={`${options[text]} text-center text-xs w-[70px] mx-auto py-1 rounded-[2px]`}
    >
      {text?.charAt(0)?.toUpperCase() + text?.slice(1)}
    </div>
  );
};

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
      <BasicTable
        type={"carePlan"}
        defaultPageSize={3}
        columns={columns}
        data={data}
      />
    </>
  );
};

function CarePlan({ clientId }) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      program: "ECM",
      username: "...",
      problems_addressed: "...",
      goal_1_problem: "...",
      goal_2_problem: "...",
      approval_status: "Requested",
      approval_status_date: "1-1-2000",
      date_created: "1-1-2000",
      goal_1_status: "Active",
      goal_2_status: "Done",
    },
    {
      program: "Diabetes",
      username: "...",
      problems_addressed: "...",
      goal_1_problem: "...",
      goal_2_problem: "...",
      approval_status: "Requested",
      approval_status_date: "1-1-2000",
      date_created: "1-1-2000",
      goal_1_status: "Active",
      goal_2_status: "Pending",
    },
    {
      program: "STOMP",
      username: "...",
      problems_addressed: "...",
      goal_1_problem: "...",
      goal_2_problem: "...",
      approval_status: "Requested",
      approval_status_date: "1-1-2000",
      date_created: "1-1-2000",
      goal_1_status: "Done",
      goal_2_status: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Program",
        accessor: "program",
        align: "left",
      },
      {
        Header: "User name",
        accessor: "username",
        align: "left",
      },
      {
        Header: "Problems addressed",
        accessor: "problems_addressed",
        align: "left",
      },
      {
        Header: "Approval status",
        accessor: "approval_status",
      },
      {
        Header: "Approval status Date",
        accessor: "approval_status_date",
        align: "left",
      },
      {
        Header: "Date Created",
        accessor: "date_created",
        align: "left",
      },
      {
        Header: "Goal 1 Problem",
        accessor: "goal_1_problem",
        align: "left",
      },
      {
        Header: "Goal 2 Problem",
        accessor: "goal_2_problem",
        align: "left",
      },
      {
        Header: "Goal 1 status",
        Cell: ({ row }) => <Tag text={row.original.goal_1_status} />,
      },
      {
        Header: "Goal 2 status",
        Cell: ({ row }) => <Tag text={row.original.goal_2_status} />,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-3 items-center mx-auto justify-center">
            <img src={EditIcon} className="size-4" alt="edit" />
            <img src={EyeIcon} className="size-4" alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div
      id="clientChartClientProfile"
      className={`bg-white rounded-md shadow-sm flex flex-col ${
        open ? "h-full" : ""
      }`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Care Plan</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <button className="px-3 py-2 text-sm bg-[#FFF2E9] text-[#1A1F25] rounded-sm font-medium">
            Add New
          </button>
          <RemoveCircleIcon
            onClick={() => setOpen(!open)}
            className="text-[#585A60] hover:cursor-pointer"
          />
        </div>
      </div>
      {open && <Content data={data} columns={columns} />}
    </div>
  );
}

export default CarePlan;
