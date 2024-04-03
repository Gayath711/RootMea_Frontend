import dayjs from "dayjs";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  getMonth,
  getWeek,
  getToday,
  getYearMonths,
  getMonth2,
} from "../utils";
import Month from "./month";
import CalendarHeader from "./calendarheader";
import AddAppointment from "./addappointment";
import AlertSuccess from "../common/AlertSuccess";
import apiURL from "../.././apiConfig";
import Week from "./week";
import YearView from "./YearView";
import TodayView from "./TodayView";

const CalendarMain = () => {
  // console.table(getMonth(3));

  const CALENDAR_VIEWS = ["Today", "Week", "Month", "Year"];
  const [currentCalendarView, setCurrentCalendarView] = useState("Month");

  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleCalendarChange = (mode) => {
    let dateParameter = "month";
    switch (currentCalendarView) {
      case "Month":
        dateParameter = "month";
        break;
      case "Week":
        dateParameter = "week";
        break;
      case "Year":
        dateParameter = "year";
        break;
      default:
        dateParameter = "month";
        break;
    }
    if (mode === 1) {
      // handle increment
      console.log({
        dateParameter,
        mode,
      });
      setCurrentDate((prev) => prev.add(1, dateParameter));
    }

    if (mode === -1) {
      // handle decrement
      console.log({
        dateParameter,
        mode,
      });
      setCurrentDate((prev) => prev.subtract(1, dateParameter));
    }
  };

  console.log({ currentDate });

  const [showModal, setShowModal] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState(false);
  const [fetchedInternalEvents, setFetchedInternalEvents] = useState(false);

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

  function fetchGoogleEvents() {
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

  function fetchInternalEvents() {
    axios
      .get(`${apiURL}/django/calendar/events/`)
      .then((response) => {
        setSavedEvents(response.data.data);
        setFetchedInternalEvents(true);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      });
  }

  console.log({ fetchedInternalEvents, fetchedGoogleEvents: fetchedEvents });

  function fetchEvents() {
    fetchGoogleEvents();
    fetchInternalEvents();
  }

  useEffect(() => {
    console.log("savedEvents - inside useeffect", savedEvents);
    fetchEvents();
  }, []);

  console.log("savedEvents - calendar", savedEvents);

  const renderCalendar = () => {
    switch (currentCalendarView) {
      case "Today":
        return <TodayView savedEvents={savedEvents} />;
      case "Week":
        return <Week currentDate={currentDate} savedEvents={savedEvents} />;
      case "Month":
        return <Month currentDate={currentDate} savedEvents={savedEvents} />;
      case "Year":
        return <YearView currentDate={currentDate} savedEvents={savedEvents} />;
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
            onIncrement={() => {
              handleCalendarChange(1);
            }}
            onDecrement={() => {
              handleCalendarChange(-1);
            }}
            currentDate={currentDate}
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
