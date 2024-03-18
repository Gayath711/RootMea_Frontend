import React from "react";
import { useState, useMemo, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import axios from "axios";

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

      setData(response.data.slice(0,6));
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
      },
      {
        Header: "Assigned Staff",
        accessor: "other_assigned_staff",
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-md shadow-md flex flex-col xl:w-[49%] min-[320px]:w-full ">
      <div className="flex justify-between items-center mx-4 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Priority Lists</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <button className="px-3 py-1 border-2 rounded-sm border-[#7397B5] text-[#28293B]">
            View all
        </button>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-[96%] mx-auto my-3 overflow-x-auto">
        <BasicTable type={"priorityList"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default PriorityList;
