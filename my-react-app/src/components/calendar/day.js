import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";

export default function Day({ day, rowIdx, savedEvents }) {
    const [dayEvents, setDayEvents] = useState([]);
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-[#2F9384] text-white rounded-full w-5"
            : "";
    }
    console.log("savedEvents", savedEvents)
    return (
        <div className="opacity-75 h-20 border border-gray-200 flex flex-col p-2">
            <div className={`flex flex-col ${rowIdx === 0 ? 'items-center pt-3' : 'items-end'}`}>
                {/* {rowIdx === 0 ? <p className="text-sm text-[#2F9384] items-center">{dayjs().format("dddd")}</p> */}
                {rowIdx === 0 ? <p className="text-sm text-[#2F9384] items-center">{day}</p>
                    : (<p className={`text-center text-sm ${getCurrentDayClass()}`}>
                        {day.format("DD")}

                    </p>)
                }
            </div>
            <div className="cursor-pointer text-xs">
                {/* {rowIdx === saved && (<div className=""><p className="bg-[#43B09C] text-gray-100 text-center">Appointment</p>
                </div>)} */}
                {/* {(new Date(day).toDateString() === new Date(savedEvents.date).toDateString())  */}
                {/* {(new Date(day).toDateString() === new Date(savedEvents.date).toDateString()) &&
                    // (day === savedEvents.date) &&
                    <p className="bg-[#43B09C] text-gray-100 text-center">appointment{savedEvents.appointement_title}</p>
                } */}
                {savedEvents.map((event, index) => {
                    if (new Date(day).toDateString() === new Date(event.date).toDateString()) {
                        return (
                            <p key={index} className="bg-[#43B09C] text-gray-100 text-center">
                                {event.appointement_title}
                            </p>
                        );
                    } else {
                        return null;
                    }
                })}


            </div>
        </div>
    )
};

// { "appointement_title": "appointment", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-27T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" }
{/* <div className="border border-gray-200 flex flex-col">
    <header className="flex flex-col items-center">
        {rowIdx === 0 && (
            <p className="text-sm mt-1">
                {day.format("ddd").toUpperCase()}
            </p>
        )}
        <p
            className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
            {day.format("DD")}
        </p>
    </header>
    <div
        className="flex-1 cursor-pointer"
        onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
        }}
    >
        {dayEvents.map((evt, idx) => (
            <div
                key={idx}
                onClick={() => setSelectedEvent(evt)}
                className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
                {evt.title}
            </div>
        ))}
    </div>
</div> */}