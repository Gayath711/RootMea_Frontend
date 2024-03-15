import dayjs from "dayjs";
import { useState, useEffect } from "react";

import { getMonth } from "../utils";
import Month from "./month";
import CalendarHeader from "./calendarheader";
import AddAppointment from "./addappointment";
import AlertSuccess from '../common/AlertSuccess';

const Calendar = () => {
    // console.table(getMonth(3));
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const [showModal, setShowModal] = useState(false);
    const [fetchedEvents, setFetchedEvents] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const submitAppointment = () => {
        setShowModal(false);
        setShowAlert(true);
    }

    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    }

    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        // savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
        // savedEvents = [{ "appointement_title": "appointment 2", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-27T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" }]
        console.log("savedEvents - inside useeffect", savedEvents);
        setSavedEvents([{ "appointement_title": "appointment 2", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-27T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" },
        { "appointement_title": "appointment 3", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-19T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" },
        ]);
        setFetchedEvents(true);
    }, [])
    // savedEvents = [{ "appointement_title": "appointment 2", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-27T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" },
    // { "appointement_title": "appointment 3", "client_name": "client Name", "scheduler_name": "S Name", "remainder_notification": "remainder", "comments": "comments", "date": "2024-03-19T00:00:00.000Z", "start_time": "2024-03-15T06:30:00.000Z", "end_time": "2024-03-15T07:30:00.000Z" },
    // ]
    console.log("savedEvents - calendar", savedEvents)
    // savedEvents = [JSON.parse(localStorage.getItem("savedEvents"))];
    return (
        <div className="">
            {showAlert && <AlertSuccess message="Saved successfully" handleClose={closeAlert} />}
            <div className={`space-y-5 m-5 ${showModal ? 'opacity-50' : ''}`}>
                <div className="flex flex-row justify-between items-end">
                    <div className="text-gray-900 text-2xl font-medium">Calendar</div>
                    <button className="w-54 h-12 bg-[#43B09C] rounded text-xs text-white p-3" onClick={toggleModal}>Add new appointment</button>
                </div>
                <div className="flex flex-col bg-white border-1 border-teal-400 rounded-md p-10 space-y-3">
                    <CalendarHeader />
                    {fetchedEvents && <Month month={currentMonth} savedEvents={savedEvents} />}
                </div>
            </div>

            {showModal && (
                <AddAppointment toggleModal={toggleModal} handleSubmit={submitAppointment} savedEvents={savedEvents} setSavedEvents={setSavedEvents} />
            )}

        </div>
    );
}

export default Calendar;