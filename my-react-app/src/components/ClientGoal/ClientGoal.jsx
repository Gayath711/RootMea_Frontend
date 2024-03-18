import React from "react";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import CarePlanImg from "../images/carePlan.svg";
import { Checkbox } from "@mui/material";

function ClientGoal() {

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
        `http://192.168.3.24:8000/clientgoal-api?search=${searchQuery}`,
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
        Header: "Client",
        accessor: "first_name",
        align: "left",
        Cell: ({ row }) =>
          `${row.original.first_name}, ${row.original.last_name}`,
      },
      {
        Header: "D.O.B",
        accessor: "dob",
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
        accessor: "care_plan_created_date",
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
    <div className="xl:w-full bg-white rounded-md shadow-md flex flex-col min-[320px]:w-full ">
      <div className="flex justify-between items-center mx-4 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-medium">Client Goal</span>
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
      <div className="w-full flex-grow flex flex-col">
        <BasicTable type={"clientGoal"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default ClientGoal;
