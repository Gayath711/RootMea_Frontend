import React from "react";
import { useState, useMemo, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import axios from "axios";
import ClientProfileImg from "../images/clientProfile.svg";
import ClientChartImg from "../images/clientChart.svg";

function ReferralPrograms() {
  
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
        `http://192.168.3.24:8000/clientreferral-api?search=${searchQuery}`,
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
        Header: "Client",
        accessor: "first_name",
        Cell: ({ row }) =>
          `${row.original.client_first_name}, ${row.original.client_last_name }`,
      },
      {
        Header: "Program",
        accessor: "program_name",
      },
      {
        Header: "Referral Date",
        accessor: "referred_date",
      },
      {
        Header: "Referral Comments",
        accessor: "referral_comments",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Progress Comments",
        accessor: "progress_comments",
      },
      {
        Header: "Closed Date",
        accessor: "date_closed",
      },
      {
        Header: "Closed By",
        accessor: "closed_by",
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div className="flex justify-between items-center mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Referral Programs</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div>
          <button className="px-3 py-1 border-2 rounded-sm border-[#2F9384] text-[#2F9384]">
            View all
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-[96%] mx-auto my-3 overflow-x-auto">
        <BasicTable type={"referralPrograms"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default ReferralPrograms;