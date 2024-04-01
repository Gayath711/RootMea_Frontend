import dayjs from "dayjs";
import { useState, useEffect } from "react";
import axios from "axios";

import { getMonth, getWeek, getToday } from "../utils";
import Month from "./month";
import CalendarHeader from "./calendarheader";
import AddAppointment from "./addappointment";
import AlertSuccess from "../common/AlertSuccess";
import apiURL from "../.././apiConfig";
import Week from "./week";

const CalendarMain = () => {
  // console.table(getMonth(3));

  const CALENDAR_VIEWS = ["Today", "Week", "Month", "Year"];
  const [currentCalendarView, setCurrentCalendarView] = useState("Month");

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const [showModal, setShowModal] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitAppointment = () => {
    setShowModal(false);
    setShowAlert(true);
  };

  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  };

  const [savedEvents, setSavedEvents] = useState([]);

  function fetchEvents() {
    axios
      .get(`${apiURL}/rest/v1/calendar/events/`)
      .then((response) => {
        setSavedEvents(response.data.data);
        setFetchedEvents(true);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      });
  }

  useEffect(() => {
    console.log("savedEvents - inside useeffect", savedEvents);
    fetchEvents();
  }, []);

  console.log("savedEvents - calendar", savedEvents);

  const renderCalendar = () => {
    switch (currentCalendarView) {
      case "Month":
        return <Month month={currentMonth} savedEvents={savedEvents} />;
      case "Week":
        return <Week week={getWeek()} savedEvents={savedEvents} />;
      default:
        return <p>No view found</p>;
    }
  };

  return (
    <div className="">
      {showAlert && (
        <AlertSuccess
          message="New Appointment Created"
          handleClose={closeAlert}
        />
      )}
      <div className={`space-y-5 m-5 ${showModal ? "opacity-50" : ""}`}>
        <div className="flex flex-row justify-between items-end">
          <div className="text-gray-900 text-2xl font-medium">Calendar</div>
          <button
            className="w-54 h-12 bg-[#43B09C] rounded text-xs text-white p-3"
            onClick={toggleModal}
          >
            Add new appointment
          </button>
        </div>
        <div className="flex flex-col bg-white border-1 border-teal-400 rounded-md p-10 space-y-3">
          <CalendarHeader
            viewList={CALENDAR_VIEWS}
            currentCalendarView={currentCalendarView}
            handleCalendarView={setCurrentCalendarView}
            currentMonth={currentMonth}
          />
          {fetchedEvents && renderCalendar()}
        </div>
      </div>

      {showModal && (
        <AddAppointment
          toggleModal={toggleModal}
          handleSubmit={submitAppointment}
          savedEvents={savedEvents}
          setSavedEvents={setSavedEvents}
          setShowAlert={setShowAlert}
          fetchEvents={fetchEvents}
        />
      )}
    </div>
  );
};

export default CalendarMain;
