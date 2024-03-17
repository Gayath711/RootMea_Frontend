import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";

export default function Day({ day, rowIdx, savedEvents }) {
    const [dayEvents, setDayEvents] = useState([]);
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-[#2F9384] text-white rounded-full w-5 h-5  mt-2 mr-2"
            : "pt-2 pr-2";
    }

    const MAX_EVENTS_DISPLAYED = 2;
    const displayedEvents = savedEvents.slice(0, MAX_EVENTS_DISPLAYED);
    const additionalEventsCount = savedEvents.length - MAX_EVENTS_DISPLAYED;
    let numberOfEvents = 0;

    // console.log("savedEvents", savedEvents)
    return (
        // <div className="opacity-75 h-20 border border-gray-200 flex flex-col">
        //     <div className={`flex flex-col  ${rowIdx === 0 ? 'items-center py-4' : 'items-end pt-1 pr-1'}`}>
        //         {/* {rowIdx === 0 ? <p className="text-sm text-[#2F9384] items-center">{dayjs().format("dddd")}</p> */}
        //         {rowIdx === 0 ? <p className="text-sm text-[#2F9384] items-center">{day}</p>
        //             : (<p className={`text-center text-sm ${getCurrentDayClass()}`}>
        //                 {day.format("DD")}

        //             </p>)
        //         }
        //     </div>
        //     <div className="text-xs">
        //         {savedEvents.map((event, index) => {
        //             // console.log("event", event);
        //             if (new Date(day).toDateString() === new Date(event.start.dateTime).toDateString()) {
        //                 return (
        //                     <>
        //                         <div key={index}>
        //                             <p key={index} className="bg-[#43B09C] text-gray-100">
        //                                 {event.summary.substring(0, 20)}
        //                             </p>
        //                         </div>
        //                     </>
        //                 );

        //             } else {
        //                 return null;
        //             }
        //         })}
        //     </div>
        // </div>
        <div className="opacity-75 h-24 border border-gray-200 flex flex-col">
            {rowIdx === 0 ?
                <div className="flex items-center justify-center h-20 text-sm text-[#2F9384]">
                    {day}
                </div>
                : (
                    <div className="flex justify-end">
                        <div className={`text-center text-sm ${getCurrentDayClass()}`}>
                            {day.format("DD")}

                        </div>
                    </div>)}
            {savedEvents.map((event, index) => {
                // console.log("event", event);
                if (new Date(day).toDateString() === new Date(event.start.dateTime).toDateString()) {
                    numberOfEvents++;
                    if (numberOfEvents < 3) {
                        return (
                            <>
                                <div key={index} className="bg-[#43B09C] text-gray-100 text-xs mb-1">

                                    {console.log("numberOfEvents", numberOfEvents)}
                                    {event.summary.substring(0, 20)}

                                </div>
                                {/* <div className="bg-[#43B09C] text-gray-100 text-xs mb-1"> */}
                                {/* {++numberOfEvents} */}
                                {/* </div> */}
                            </>
                        );
                    } else {
                        // return (numberOfEvents - 3);
                        return null;
                    }
                } else {
                    return null;
                }
            })}

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