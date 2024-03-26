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
      className={`${options[text]} text-center text-xs px-3 py-0.5 mx-auto w-fit`}
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
          type={"appointments"}
          defaultPageSize={3}
          columns={columns}
          data={data}
        />
    </>
  );
};

function Appointments({clientId}) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      staff_name: "John Doe",
      facility: "...",
      program: "ECM",
      reason: "...",
      date: "2024-1-1",
      time: "10.30 am - 11.30 am",
      duration: "1hr 30mins",
      status: "Done",
    },
    {
      staff_name: "John Doe",
      facility: "...",
      program: "ECM",
      reason: "...",
      date: "2024-1-1",
      time: "10.30 am - 11.30 am",
      duration: "1hr 30mins",
      status: "Active",
    },
    {
      staff_name: "John Doe",
      facility: "...",
      program: "ECM",
      reason: "...",
      date: "2024-1-1",
      time: "10.30 am - 11.30 am",
      duration: "1hr 30mins",
      status: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Staff Name",
        accessor: "staff_name",
        align: "left",
      },
      {
        Header: "Facility",
        accessor: "facility",
      },
      {
        Header: "Program",
        accessor: "program",
      },
      {
        Header: "Reason",
        accessor: "reason",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Status",
        Cell: ({ row }) => <Tag text={row.original.status} />,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-1 items-center mx-auto">
            <img src={EditIcon} className="size-4 mx-auto" alt="edit" />
            <img src={EyeIcon} className="size-4 mx-auto" alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div
      id="clientChartClientProfile"
      className={`bg-white rounded-md shadow-sm flex flex-col ${open ? "h-full" : ""}`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Appointments</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <button className="px-3 py-2 text-sm bg-[#78C3B8] text-[#1A1F25] rounded-sm font-medium">
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

export default Appointments;
