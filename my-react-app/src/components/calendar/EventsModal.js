import React, { useState } from "react";
import ClosePNG from "../images/close.png";
import GoogleIcon from "../images/google_icon.svg";
import dayjs from "dayjs";

const EventModal = ({ eventDate, toggleModal, events = [] }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen">
      <div className="flex flex-col border bg-white border-gray-500 rounded-md w-6/12">
        <div className="bg-white rounded-lg pb-2">
          <header className="flex flex-row justify-between items-start px-3 pt-3">
            <p className="text-gray-600 font-semibold flex flex-row items-center gap-1">
              <span className="text-xs text-white bg-[#2F9384] p-1 px-2 rounded-md">
                {events.length}
              </span>
              <span>Appointments</span>
              <span className="text-xs">{`${
                eventDate ? `(${eventDate})` : ""
              }`}</span>
            </p>
            <button onClick={toggleModal} className="">
              <img src={ClosePNG} className="w-4 h-4"></img>
            </button>
          </header>
        </div>
        <div className="border border-gray-500" />
        <div className="flex flex-col max-h-[50vh] overflow-y-auto p-2">
          <div className="flex flex-col divide-y divide-slate-200">
            {events.map((event, index) => {
              const startTime = dayjs(event.start.dateTime).format("HH:mm A");
              const endTime = dayjs(event.end.dateTime).format("HH:mm A");

              return (
                <div
                  key={index}
                  className="p-2 py-1 relative hover:bg-gray-100"
                >
                  <a href={event.htmlLink} target="_blank">
                    <div
                      className={`flex flex-row gap-1 items-start w-full rounded-tl-sm rounded-tr-sm mx-1`}
                    >
                      <img
                        src={GoogleIcon}
                        className="size-4 sm:size-5"
                        alt="google-meet"
                      />
                      <div className="text-left font-normal">
                        <p className="truncate text-xs m-0">{event.summary}</p>
                        <span className="truncate text-xs">
                          {startTime + "-" + endTime}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
