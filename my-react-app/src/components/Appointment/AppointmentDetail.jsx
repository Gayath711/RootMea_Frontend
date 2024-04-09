import React from "react";
import ClosePNG from "../images/close.png";
import GoogleIcon from "../images/google_icon.svg";
import CalendarIcon from "../images/calendar-boxed.svg";
import UserIcon from "../images/user.png";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const AppointmentDetail = ({ toggleModal, event }) => {
  console.log({ event });

  console.log({
    atm: event.attendees, // email
  });

  const startTime = dayjs(event.start.dateTime).format("hh:mm A");
  const endTime = dayjs(event.end.dateTime).format("hh:mm A");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col border bg-white border-gray-500 rounded-md">
        <div className=" bg-white rounded-lg">
          <header className="flex flex-row justify-between items-center px-3 pt-3 gap-2">
            <p className="text-gray-600 font-semibold">{event.summary}</p>
            <button onClick={toggleModal} className="">
              <img src={ClosePNG} className="w-4 h-4"></img>
            </button>
          </header>
        </div>
        <div className="my-1 border border-gray-500" />
        <div className="flex flex-col gap-2 my-2">
          <div className="p-2 py-1 relative">
            <div
              className={`flex flex-row gap-1 items-start w-full rounded-tl-sm rounded-tr-sm mx-1`}
            >
              <img
                src={event.isExternal ? GoogleIcon : CalendarIcon}
                className={
                  event.isExternal ? "size-4 sm:size-5" : "size-3 sm:size-3"
                }
                alt="event-meet"
              />
              <div className="text-left font-normal">
                <p className="text-xs m-0">{event.summary}</p>
                <span className="truncate text-xs">
                  {startTime + "-" + endTime}
                </span>
              </div>
            </div>
            {event.attendees && (
              <div className="flex flex-column gap-2 w-full m-1 my-3">
                {event.attendees.map((each) => {
                  return (
                    <div className="flex gap-1 items-center justify-start">
                      <img
                        src={UserIcon}
                        className={"size-3 sm:size-3"}
                        alt="attendees-meet"
                      />
                      <p className="text-xs">{each.email}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-center items-center my-2">
              <Link
                to={event.htmlLink}
                target="_blank"
                className="px-2.5 sm:px-4 py-1.5 rounded-sm text-white h-fit w-fit bg-[#43B09C] text-[10px] sm:text-xs font-medium"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
