import React from "react";
import { useState, useMemo, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import axios from "axios";
import "./PriorityListStyles.css";

function PriorityList() {
  
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.3.24:8000/clientprioritylist-api?search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching Client Data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Program",
        accessor: "program_name",
        align: "left",
      },
      {
        Header: "List Name",
        accessor: "priority_list_name",
      },
      {
        Header: "Total Clients",
        accessor: "total_clients",
      },
      {
        Header: "Latest Edit",
        accessor: "last_edited_by_me",
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
        accessor: "other_assigned_staff",
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-md shadow-md flex flex-col min-[320px]:w-full">
      <div id="priority-list-2" className="flex justify-between items-center mx-3 sm:mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span id="priority-list-3" className="text-lg font-medium">Priority Lists</span>
          <img id="priority-list-4" src={ExternalLinkIcon} className="size-3 sm:size-4" alt="link" />
        </div>
        <div>
          <button id="priority-list-5" className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#7397B5] text-[#28293B] text-xs">
            View all
          </button>
        </div>
      </div>
      <hr id="priority-list-6" className="w-[98%] mx-auto my-2" />
      <div className="w-full flex-grow flex flex-col">
        <BasicTable type={"priorityList"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default PriorityList;
