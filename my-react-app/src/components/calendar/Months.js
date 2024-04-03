import dayjs from "dayjs";
import React, { useState } from "react";

import GoogleIcon from "../images/google_icon.svg";
import EventModal from "./EventsModal";

export default function Months({ month, savedEvents }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function getCurrentDayClass() {
    return month.format("MMMMYYYY") === dayjs().format("MMMMYYYY")
      ? "bg-[#2F9384] text-white rounded h-5 mt-2 px-2"
      : "pt-2 pr-2";
  }

  function getTitleBackGround() {
    const monthName = month.format("MMMM");

    switch (monthName) {
      case "January":
        return "text-white bg-fuchsia-900";
      case "February":
        return "text-white bg-emerald-500";
      case "March":
        return "text-white bg-sky-500";
      case "April":
        return "text-white bg-red-500";
      case "May":
        return "text-black bg-yellow-200";
      case "June":
        return "text-white bg-teal-500";
      case "July":
        return "text-white bg-indigo-500";
      case "August":
        return "text-white bg-orange-500";
      case "September":
        return "text-white bg-lime-500";
      case "October":
        return "text-white bg-violet-500";
      case "November":
        return "text-white bg-cyan-500";
      case "December":
        return "text-white bg-rose-500";
      default:
        return "";
    }
  }

  const eventsForMonth = savedEvents.filter(
    (event) =>
      month.format("MMMM") === dayjs(event.start.dateTime).format("MMMM") &&
      month.year() === dayjs(event.start.dateTime).year()
  );

  const displayedEvents = eventsForMonth.slice(0, 2);
  const additionalEventsCount = Math.max(eventsForMonth.length - 2, 0);

  return (
    <>
      <div className={`opacity-75 border border-gray-200 flex flex-col h-36`}>
        <div className="flex justify-start ms-2">
          <p className={`text-center text-sm ${getCurrentDayClass()}`}>
            {`${month.format("MMM")} ${month.format("YYYY")}`}
          </p>
        </div>
        {displayedEvents.map((event, index) => (
          <div key={index} className="m-2 mb-0 relative">
            <a href={event.htmlLink} target="_blank">
              <div
                className={`flex flex-row gap-1 items-center w-full h-7 ${getTitleBackGround()} rounded-tl-sm rounded-tr-sm mx-1`}
              >
                <img
                  src={GoogleIcon}
                  className="size-4 sm:size-5"
                  alt="google-meet"
                />
                <div className="text-center text-xs font-normal truncate">
                  {event.summary}
                </div>
              </div>
            </a>
          </div>
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
          eventDate={month.format("MMMM-YYYY")}
          toggleModal={toggleModal}
          events={eventsForMonth}
        />
      )}{" "}
    </>
  );
}
