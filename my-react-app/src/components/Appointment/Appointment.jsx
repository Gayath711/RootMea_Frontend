import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./AppointmentStyles.css";
import useAppointments from "../../hooks/useAppointments";
import { getUpcomingEvents } from "../utils";

const AppointmentItem = ({ id, event }) => {
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

  return (
    <>
      <div className="flex justify-between gap-x-2">
        <div className="flex gap-2">
          <div
            id={`appointment-${event.id ? event.id : id}`}
            className="flex flex-col justify-center items-center w-[40px] h-[40px] sm:w-12 sm:h-12 bg-[#89D6DE] text-white p-2"
          >
            <span className="text-[14px] sm:text-base">
              {new Date(event.start.dateTime).getDate()}
            </span>
            <span className="text-[8px] sm:text-base">
              {new Date(event.start.dateTime).toLocaleString("default", {
                month: "short",
              })}
            </span>
          </div>
          <div
            id={`appointment-${event.id ? event.id : id}`}
            className="space-y-0.5"
          >
            <div className="text-[13px] sm:text-sm font-medium">
              {event.summary || "Untitled Appointment"}
            </div>
            <div className="text-[11px] sm:text-xs py-1 flex flex-wrap gap-1">
              <span>Created by:</span>
              <span className="sm:w-100 w-[125px] text-xs md:truncate">
                {event.creator && event.creator.email
                  ? event.creator.email
                  : ""}
              </span>
            </div>
            <div className="text-[9px] sm:text-xs">
              {startTime} to {endTime}
            </div>
          </div>
        </div>
        <button className="px-2.5 sm:px-4 py-1.5 rounded-sm text-white h-fit w-fit bg-[#43B09C] text-[10px] sm:text-xs font-medium">
          Details
        </button>
      </div>
    </>
  );
};

function Appointment() {
  const { eventList, fetchEvents } = useAppointments();

  let upcomingEvents = getUpcomingEvents(eventList);

  return (
    <div className="bg-white w-full rounded-md shadow-md sm:col-span-8">
      <div className="flex justify-between items-center mx-3 sm:mx-6 mt-6 mb-2">
        <div id="appointment-1" className="text-lg font-medium">
          Upcoming
        </div>
        <button
          id="appointment-2"
          className="flex justify-center items-center space-x-1 bg-[#5BC4BF] text-white px-2.5 py-1 sm:py-1.5 my-1.5 sm:my-0 text-xs rounded-sm"
        >
          <AddCircleIcon
            id="appointment-3"
            className="text-white size-3 sm:size-4"
          />
          <span className="text-[10px] sm:text-xs">New Appointment</span>
        </button>
      </div>
      <hr id="appointment-HR" className="w-11/12 mx-auto my-2" />
      <div className="flex flex-col justify-between space-y-6 mx-3 my-8">
        {upcomingEvents.slice(0, 5).map((event, idx) => (
          <AppointmentItem key={event.id} event={event} id={idx} />
        ))}
      </div>
    </div>
  );
}

export default Appointment;
