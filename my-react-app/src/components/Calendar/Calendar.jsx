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
      <div className="bg-white shadow-md rounded-md xl:w-full text-xs border min-[320px]:w-[38%] p-[20px] ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="date-picker" defaultValue={dayjs(selectedDate)} onChange={setSelectedDate} />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default CalendarCard;
