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
    <div className={`${options[text]} text-center text-xs w-[70px] mx-auto py-1 rounded-[2px]`}>
      {text?.charAt(0)?.toUpperCase() + text?.slice(1)}
    </div>
  );
};

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
        <BasicTable type={"priorityLists"} defaultPageSize={10} columns={columns} data={data} />
    </>
  );
};

function PriorityLists({clientId}) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      program: "ECM",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Done",
    },
    {
      program: "Diabetes",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Active",
    },
    {
      program: "STOMP",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Pending",
    },
    {
      program: "Diabetes",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Done",
    },
    {
      program: "ECM",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Done",
    },
    {
      program: "Diabetes",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Pending",
    },
    {
      program: "Diabetes",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Pending",
    },
    {
      program: "ECM",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Active",
    },
    {
      program: "STOMP",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Active",
    },
    {
      program: "STOMP",
      list_name: "...",
      working_on_this_list: "...",
      link_to_user_contact_info: "...",
      status_date: "1-1-2000",
      status: "Done",
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
        Header: "List Name",
        accessor: "list_name",
      },
      {
        Header: "Working on this list",
        accessor: "working_on_this_list",
      },
      {
        Header: "Status",
        Cell: ({ row }) => <Tag text={row.original.status} />,
      },
      {
        Header: "Status Date",
        accessor: "status_date",
      },
      {
        Header: "link to use contact info",
        accessor: "link_to_user_contact_info",
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
      className={`bg-white rounded-md shadow-sm flex flex-col ${open ? "h-full" : ""}`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Priority Lists</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <button className="px-3 py-2 text-sm bg-[#76818E] text-white rounded-sm font-medium">
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

export default PriorityLists;
