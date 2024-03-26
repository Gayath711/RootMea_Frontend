import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from 'dayjs';
import "./CalendarStyles.css";


const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="bg-white shadow-md rounded-md lg:w-full text-xs border p-[20px] col-span-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="date-picker" defaultValue={dayjs(selectedDate)} onChange={setSelectedDate} />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default CalendarCard;