import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import DocumentAddIcon from "../images/documentAdd.svg";
import EditIcon from "../images/edit.svg";
import EyeIcon from "../images/eye.svg";
import "./AppointmentCalendarStyles.css";

import useAppointments from "../../hooks/useAppointments";
import { getUpcomingEvents } from "../utils";
import { Link } from "react-router-dom";

function AppointmentCalendar() {
  const { eventList, fetchEvents } = useAppointments();

  let upcomingEvents = useMemo(() => {
    console.count("upcomingEvents");
    return getUpcomingEvents(eventList);
  }, [eventList]);
  const data = useMemo(() => {
    console.count("upcomingEvents data");

    return upcomingEvents.map((event) => {
      // Extract start and end times
      const startTime = new Date(event.start.dateTime).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const endTime = new Date(event.end.dateTime).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Extract summary and description
      const clientTopic = event.summary || ""; // If summary is not present, set to empty string
      const description = event.description || ""; // If description is not present, set to empty string

      // Create the transformed object
      return {
        // date: new Date(event.start.dateTime).toLocaleTimeString([], {
        //   day: "2-digit",
        //   month: "long",
        //   year: "2-digit",
        //   hour: "numeric",
        //   minute: "2-digit",
        //   hour12: true,
        // }),
        time: `${startTime} - ${endTime}`,
        clientTopic: clientTopic,
        description: description,
        encounterMode: "...", // Placeholder for encounter mode
      };
    });
  }, [upcomingEvents]);

  console.count("appointmentCalendae");

  // const [data, setData] = useState([
  //   {
  //     time: "9 a.m - 10 a.m",
  //     clientTopic: "Team Meeting",
  //     descriptions: "Care plan review",
  //     encounterMode: "...",
  //   },
  //   {
  //     time: "9 a.m - 10 a.m",
  //     clientTopic: "Team Meeting",
  //     descriptions: "Care plan review",
  //     encounterMode: "...",
  //   },
  //   {
  //     time: "9 a.m - 10 a.m",
  //     clientTopic: "Team Meeting",
  //     descriptions: "Care plan review",
  //     encounterMode: "...",
  //   },
  //   {
  //     time: "9 a.m - 10 a.m",
  //     clientTopic: "Team Meeting",
  //     descriptions: "Care plan review",
  //     encounterMode: "...",
  //   },
  //   {
  //     time: "9 a.m - 10 a.m",
  //     clientTopic: "Team Meeting",
  //     descriptions: "Care plan review",
  //     encounterMode: "...",
  //   },
  // ]);

  const columns = [
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
  ];

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div
        id="appointment-calendar-2"
        className="flex justify-between items-center mx-3 sm:mx-8 mt-6"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span id="appointment-calendar-3" className="text-lg font-medium">
            Appointment Calendar
          </span>
          <img
            id="appointment-calendar-4"
            src={ExternalLinkIcon}
            className="size-3 sm:size-4"
            alt="link"
          />
        </div>
        <div>
          <Link
            to="/calendar"
            id="appointment-calendar-5"
            className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#EBAC88] text-[#CB6A69] text-[13px] font-medium leading-5"
          >
            Create New
          </Link>
        </div>
      </div>
      <hr id="appointment-calendar-6" className="w-[98%] mx-auto my-2" />
      <div className="w-full flex-grow flex flex-col">
        <BasicTable
          type={"appointmentCalendar"}
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}

export default React.memo(AppointmentCalendar);
