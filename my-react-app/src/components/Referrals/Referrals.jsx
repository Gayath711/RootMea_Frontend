import React, { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import SearchIcon from "@mui/icons-material/Search";
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
          type={"referrals"}
          defaultPageSize={3}
          columns={columns}
          data={data}
        />
    </>
  );
};

function Referrals({clientId}) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      referred_to: "ECM",
      referred_by: "...",
      notes: "...",
      date: "2000-1-1",
      time: "10 a.m",
      activity_no: "...",
      status: "Done",
    },
    {
      referred_to: "ECM",
      referred_by: "...",
      notes: "...",
      date: "2000-1-1",
      time: "10 a.m",
      activity_no: "...",
      status: "Active",
    },
    {
      referred_to: "ECM",
      referred_by: "...",
      notes: "...",
      date: "2000-1-1",
      time: "10 a.m",
      activity_no: "...",
      status: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Referred to",
        accessor: "referred_to",
        align: "left",
      },
      {
        Header: "Referred by",
        accessor: "referred_by",
      },
      {
        Header: "Notes",
        accessor: "notes",
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
        Header: "Activity No",
        accessor: "activity_no",
      },
      {
        Header: "Status",
        Cell: ({ row }) => <Tag text={row.original.status} />,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <img src={EditIcon} className="size-4 mx-auto" alt="view" />
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
          <div className="text-[#28293B] text-xl">Referrals</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <SearchIcon className="text-[#585A60] hover:cursor-pointer" />
          <button className="px-3 py-2 text-sm bg-[#FFD9EB] text-[#1A1F25] rounded-sm font-medium">
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

export default Referrals;
