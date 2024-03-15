import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import CarePlanImg from "../images/carePlan.svg";
import { Checkbox } from "@mui/material";

function ClientGoal() {
  const [data, setData] = useState([
    {
      client: "John Doe",
      date_of_birth: "...",
      goal: "...",
      problem: "...",
      status: "...",
      status_date: "...",
      created_date: "...",
    },
    {
      client: "John Doe",
      date_of_birth: "...",
      goal: "...",
      problem: "...",
      status: "...",
      status_date: "...",
      created_date: "...",
    },
    {
      client: "John Doe",
      date_of_birth: "...",
      goal: "...",
      problem: "...",
      status: "...",
      status_date: "...",
      created_date: "...",
    },
    {
      client: "John Doe",
      date_of_birth: "...",
      goal: "...",
      problem: "...",
      status: "...",
      status_date: "...",
      created_date: "...",
    },
    {
      client: "John Doe",
      date_of_birth: "...",
      goal: "...",
      problem: "...",
      status: "...",
      status_date: "...",
      created_date: "...",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Client",
        accessor: "client",
      },
      {
        Header: "D.O.B",
        accessor: "date_of_birth",
      },
      {
        Header: "Goal",
        accessor: "goal",
      },
      {
        Header: "Problem",
        accessor: "problem",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Status Date",
        accessor: "status_date",
      },
      {
        Header: "Created Date",
        accessor: "created_date",
      },
      {
        Header: "Care Plan",
        Cell: () => (
          <img src={CarePlanImg} className="size-6 mx-auto" alt="client" />
        ),
      },
    ],
    []
  );

  return (
    <div className="xl:w-[65%] bg-white rounded-md shadow-md flex flex-col min-[320px]:w-full ">
      <div className="flex justify-between items-center mx-4 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Client Goal</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <label htmlFor="client-goal-active" className="flex items-center">
            <Checkbox
              checked={true}
              // onChange={handleChange}
              style={{
                color: "#2F9384",
                padding: "5px",
              }}
              inputProps={{ "aria-label": "controlled" }}
              /><span className="text-[#2F9384]">Active</span>
          </label>
          <label htmlFor="client-goal-active" className="flex items-center">
            <Checkbox
              checked={false}
              // onChange={handleChange}
              style={{
                color: "#7397B5",
                padding: "5px",
              }}
              inputProps={{ "aria-label": "controlled" }}
            /><span className="text-[#7397B5]">Completed</span>
          </label>
          <button className="px-3 py-1 border-2 rounded-sm border-[#7397B5] text-[#28293B]">
            View all
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-[96%] mx-auto my-3 overflow-x-auto"  >
        <BasicTable type={"clientGoal"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default ClientGoal;
