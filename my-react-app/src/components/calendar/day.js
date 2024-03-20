import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";

export default function Day({ day, rowIdx, savedEvents }) {
    const [dayEvents, setDayEvents] = useState([]);
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-[#2F9384] text-white rounded-full w-5 h-5  mt-2 mr-2"
            : "pt-2 pr-2";
    }

    function getTitleBackGround() {
        const dayOfWeek = day.format("dddd");

        switch (dayOfWeek) {
            case "Sunday":
                return "text-white bg-fuchsia-900"
            case "Monday":
                return "text-white bg-emerald-500"
            case "Tuesday":
                return "text-white bg-sky-500"
            case "Wednesday":
                return "text-white bg-red-500"
            case "Thursday":
                return "text-black bg-yellow-200"
            case "Friday":
                return "text-white bg-teal-500"
            case "Saturday":
                return "text-white bg-indigo-500"
        }
    }

    const MAX_EVENTS_DISPLAYED = 2;
    const displayedEvents = savedEvents.slice(0, MAX_EVENTS_DISPLAYED);
    const additionalEventsCount = savedEvents.length - MAX_EVENTS_DISPLAYED;
    let numberOfEvents = 0;

    // console.log("savedEvents", savedEvents)
    return (
        <div className="opacity-75 h-36 border border-gray-200 flex flex-col">
            {rowIdx === 0 ?
                <div className="flex items-center justify-center h-36 text-sm text-[#2F9384]">
                    {day}
                </div>
                : (
                    <div className="flex justify-end">
                        <div className={`text-center text-sm ${getCurrentDayClass()}`}>
                            {day.format("DD")}
                        </div>
                    </div>)}
            {savedEvents.map((event, index) => {
                if (new Date(day).toDateString() === new Date(event.start.dateTime).toDateString()) {
                    numberOfEvents++;
                    if (numberOfEvents < 3) {
                        return (
                            <>
                                <div className="m-2 relative">
                                    <div className="flex flex-col space-y-8 w-full h-20 left-0 top-0 absolute bg-white rounded-sm shadow">
                                        <div className={`w-full h-7 left-0 top-0 absolute ${getTitleBackGround()} rounded-tl-sm rounded-tr-sm p-2`}>
                                            <div className="text-center  text-xs font-normal">{event.summary.substring(0, 15)}</div>
                                        </div>
                                        <div className="text-gray-800 text-xs font-normal p-2">
                                            {new Date(event.start.dateTime).toDateString()}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            })}

        </div>
    )
};
