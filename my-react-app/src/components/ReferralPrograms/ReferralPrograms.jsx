import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import ClientProfileImg from "../images/clientProfile.svg";
import ClientChartImg from "../images/clientChart.svg";

function ReferralPrograms() {
  const [data, setData] = useState([
    {
      client: "Vincent",
      program: "Program, Activity",
      referralDate: "24-02-2024",
      referralComments: "...",
      status: "New",
      progressComments: "...",
      closedDate: "24-02-2024",
      closedBy: "User",
    },
    {
      client: "Sullivan ",
      program: "Program, Activity",
      referralDate: "24-02-2024",
      referralComments: "...",
      status: "Closed",
      progressComments: "...",
      closedDate: "24-02-2024",
      closedBy: "User",
    },
    {
      client: "Gray ",
      program: "Program, Activity",
      referralDate: "24-02-2024",
      referralComments: "...",
      status: "Pending",
      progressComments: "...",
      closedDate: "24-02-2024",
      closedBy: "User",
    },
    {
      client: "Farrell ",
      program: "Program, Activity",
      referralDate: "24-02-2024",
      referralComments: "...",
      status: "...",
      progressComments: "...",
      closedDate: "24-02-2024",
      closedBy: "User",
    },
    {
      client: "Bennett ",
      program: "Program, Activity",
      referralDate: "24-02-2024",
      referralComments: "...",
      status: "...",
      progressComments: "...",
      closedDate: "24-02-2024",
      closedBy: "User",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Client",
        accessor: "client",
      },
      {
        Header: "Program",
        accessor: "program",
      },
      {
        Header: "Referral Date",
        accessor: "referralDate",
      },
      {
        Header: "Referral Comments",
        accessor: "referralComments",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Progress Comments",
        accessor: "progressComments",
      },
      {
        Header: "Closed Date",
        accessor: "closedDate",
      },
      {
        Header: "Closed By",
        accessor: "closedBy",
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
