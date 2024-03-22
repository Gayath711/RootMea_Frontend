import React from "react";
import { useState, useMemo, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import axios from "axios";

function PriorityListMyPrograms() {
  const [data, setData] = useState([
    {
      program: "ECM",
      listName: "My Panel",
      totalClients: "27",
      latestEdit: "06-01-2024",
      assignedStaff: "...",
    },
    {
      program: "Diabetes",
      listName: "High A1c",
      totalClients: "250",
      latestEdit: "06-01-2024",
      assignedStaff: "...",
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
        accessor: "listName",
      },
      {
        Header: "Total Clients",
        accessor: "totalClients",
      },
      {
        Header: "Latest Edit",
        accessor: "latestEdit",
        Cell: ({ value }) => {
          // Parse the date string
          const date = new Date(value);
          // Extract day, month, and year
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          // Format date as "dd-mm-yyyy"
          return `${month}-${day}-${year}`;
        },
      },
      {
        Header: "Assigned Staff",
        accessor: "assignedStaff",
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-md shadow-md flex flex-col xl:w-[49%] min-[320px]:w-full ">
      <div className="flex justify-between items-center mx-4 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-medium">Priority Lists in my Programs</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <button className="px-3 py-1 border-2 text-xs rounded-sm border-[#7397B5] text-[#28293B]">
            View all
        </button>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-full flex-grow flex flex-col">
        <BasicTable type={"priorityListPrograms"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default PriorityListMyPrograms;
