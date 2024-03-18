import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import DocumentAddIcon from "../images/documentAdd.svg";
import EditIcon from "../images/edit.svg";
import EyeIcon from "../images/eye.svg";
import { Checkbox } from "@mui/material";

function Encounters() {
  const [data, setData] = useState([
    {
      date: "01-01-2000",
      time: "9 A.M",
      client: "...",
      reason: "...",
      noteStatus: "...",
      appointmentStatus: "No Show",
    },
    {
      date: "01-01-2000",
      time: "9 A.M",
      client: "...",
      reason: "...",
      noteStatus: "...",
      appointmentStatus: "No Show",
    },
    {
      date: "01-01-2000",
      time: "9 A.M",
      client: "...",
      reason: "...",
      noteStatus: "...",
      appointmentStatus: "No Show",
    },
    {
      date: "01-01-2000",
      time: "9 A.M",
      client: "...",
      reason: "...",
      noteStatus: "...",
      appointmentStatus: "No Show",
    },
    {
      date: "01-01-2000",
      time: "9 A.M",
      client: "...",
      reason: "...",
      noteStatus: "...",
      appointmentStatus: "No Show",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Client",
        accessor: "client",
      },
      {
        Header: "Reason",
        accessor: "reason",
      },
      {
        Header: "Note Status",
        accessor: "noteStatus",
      },
      {
        Header: "Start Note",
        Cell: ({ row }) => (
          <div className="mx-auto flex justify-around space-x-2 items-center">
            <img src={DocumentAddIcon} alt="add" />
            <img src={EditIcon} alt="edit" />
            <img src={EyeIcon} alt="view" />
          </div>
        ),
      },
      {
        Header: "Appointment Status",
        accessor: "appointmentStatus",
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div className="flex justify-between items-center mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Encounters</span>
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
            />
            <span className="text-[#2F9384]">Active</span>
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
            />
            <span className="text-[#1F4B51]">Completed</span>
          </label>
          <button className="px-3 py-1 border-1 rounded-sm border-[#1F4B51] text-[#28293B]">
            View all
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-[96%] mx-auto my-3 overflow-auto">
        <BasicTable type={"encounters"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Encounters;
