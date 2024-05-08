import dayjs from "dayjs";
import React, { useState } from "react";

import GoogleIcon from "../images/google_icon.svg";
import CalendarIcon from "../images/calendar-boxed.svg";
import InternalCalendarIcon from "../images/internal-meeting.svg";
import EventModal from "./EventsModal";
import AppointmentDetail, {
  AppointmentDetail_Modal,
} from "../Appointment/AppointmentDetail";
import AddAppointment from "./addappointment";

export default function Day({
  day,
  rowIdx,
  savedEvents,
  isMonth,
  isWeek,
  fetchEvents,
}) {
  const [dayEvents, setDayEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-[#2F9384] text-white rounded-full w-5 h-5 mt-2 mr-2"
      : "pt-2 pr-2";
  }

  function getTitleBackGround() {
    const dayOfWeek = day.format("dddd");

    switch (dayOfWeek) {
      case "Sunday":
        return "text-white bg-fuchsia-900";
      case "Monday":
        return "text-white bg-emerald-500";
      case "Tuesday":
        return "text-white bg-sky-500";
      case "Wednesday":
        return "text-white bg-red-500";
      case "Thursday":
        return "text-black bg-yellow-200";
      case "Friday":
        return "text-white bg-teal-500";
      case "Saturday":
        return "text-white bg-indigo-500";
      default:
        return "";
    }
  }

  const eventsForDay = savedEvents.filter(
    (event) =>
      new Date(day).toDateString() ===
      new Date(event.start.dateTime).toDateString()
  );

  const displayedEvents = eventsForDay.slice(0, isWeek ? 10 : 2);
  const additionalEventsCount = Math.max(
    eventsForDay.length - (isWeek ? 10 : 2),
    0
  );

  const [showDetailModal, setShowDetailModal] = useState(null);
  const [editEvent, setEditEvent] = useState(false);

  const toggleDetailModal = (index) => {
    setShowDetailModal(index);
  };

  return (
    <>
      <div
        className={`opacity-75 border border-gray-200 flex flex-col ${
          rowIdx === 0 || isMonth ? "h-36" : "h-screen"
        }`}
      >
        {rowIdx === 0 ? (
          <div className="flex items-center justify-center h-36 text-sm text-[#2F9384]">
            {day}
          </div>
        ) : (
          <div className="flex justify-end">
            <div className={`text-center text-sm ${getCurrentDayClass()}`}>
              {day.format("DD")}
            </div>
          </div>
        )}
        {displayedEvents.map((event, index) => (
          <>
            <div key={index} className="m-2 mb-0 relative">
              <a
                // href={event.htmlLink}
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDetailModal(index);
                }}
              >
                <div
                  className={`flex flex-row gap-1 items-center w-full h-7 ${getTitleBackGround()} rounded-tl-sm rounded-tr-sm mx-1`}
                >
                  <img
                    src={event.isExternal ? GoogleIcon : InternalCalendarIcon}
                    className={`${
                      event.isExternal
                        ? "h-[16px] w-[16px] ms-1 bg-white rounded-full"
                        : "h-[20px] w-[20px] ms-1"
                    }`}
                    alt="event-meet"
                  />

                  <div className="text-center text-xs font-normal truncate">
                    {event.summary}
                  </div>
                </div>
              </a>
            </div>
            {showDetailModal === index && (
              <AppointmentDetail_Modal
                showPreview={showDetailModal === index}
                toggleModal={() => toggleDetailModal(null)}
                event={event}
                toggleEdit={() => setEditEvent(index)}
              />
            )}
            <AddAppointment
              show={editEvent === index}
              toggleModal={() => setEditEvent(null)}
              setShowAlert={null}
              fetchEvents={fetchEvents}
              appointmentDetail={event}
              isUpdate
            />
          </>
        ))}
        {additionalEventsCount > 0 && (
          <div
            className="flex items-center justify-center mt-2 text-sm text-[#2F9384] cursor-pointer"
            onClick={() => {
              setShowModal(true);
            }}
          >
            +{additionalEventsCount} more
          </div>
        )}
      </div>

      {showModal && (
        <EventModal
          show={showModal}
          eventDate={day.format("DD-MMM-YYYY")}
          toggleModal={toggleModal}
          events={eventsForDay}
          fetchEvents={fetchEvents}
        />
      )}
    </>
  );
}
