import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import DocumentAddIcon from "../images/documentAdd.svg"
import EditIcon from "../images/edit.svg"
import EyeIcon from "../images/eye.svg"

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
        align: "left",
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
        Cell: ({ row }) => (
          <div className="mx-auto flex justify-around items-center">
            <img src={DocumentAddIcon} alt="add" />
            <img src={EditIcon} alt="edit" />
            <img src={EyeIcon} alt="view" />
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="mx-auto flex justify-around space-x-2 items-center">
            <img src={EditIcon} alt="edit" />
            <img src={EyeIcon} alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div className="flex justify-between items-center mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-medium">Appointment Calendar</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div>
          <button className="px-2 py-1 border-2 text-xs rounded-sm border-[#EBAC88] text-[#CB6A69]">
            Create New
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-full flex-grow flex flex-col">
        <BasicTable type={'appointmentCalendar'} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default AppointmentCalendar;
