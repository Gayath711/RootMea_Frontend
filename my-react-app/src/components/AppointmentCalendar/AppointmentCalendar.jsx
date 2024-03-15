import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import ClientProfileImg from "../images/clientProfile.svg"
import ClientChartImg from "../images/clientChart.svg"

function AppointmentCalendar() {

  const [data, setData] = useState([
    {
      time: "9 a.m - 10 a.m",
      clientTopic: "Team Meeting",
      descriptions: "Care plan review",
      encounterMode: "...",
    },
    {
      time: "9 a.m - 10 a.m",
      clientTopic: "Team Meeting",
      descriptions: "Care plan review",
      encounterMode: "...",
    },
    {
      time: "9 a.m - 10 a.m",
      clientTopic: "Team Meeting",
      descriptions: "Care plan review",
      encounterMode: "...",
    },
    {
      time: "9 a.m - 10 a.m",
      clientTopic: "Team Meeting",
      descriptions: "Care plan review",
      encounterMode: "...",
    },
    {
      time: "9 a.m - 10 a.m",
      clientTopic: "Team Meeting",
      descriptions: "Care plan review",
      encounterMode: "...",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Client Topic",
        accessor: "clientTopic",
      },
      {
        Header: "Descriptions",
        accessor: "descriptions",
      },
      {
        Header: "Encounter Mode",
        accessor: "encounterMode",
      },
      {
        Header: "Encounter Note",
        accessor: "encounterNote",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div className="flex justify-between items-center mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Appointment Calendar</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div>
          <button className="px-2 py-1 border-1 rounded-sm border-[#EBAC88] text-[#CB6A69]">
            Create New
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-[96%] mx-auto my-3">
        <BasicTable type={'appointmentCalendar'} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default AppointmentCalendar;
