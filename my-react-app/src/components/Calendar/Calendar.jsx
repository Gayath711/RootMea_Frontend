import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./CalendarStyles.css";


const CalendarCard = () => {
  return (
    <>
      <div className="bg-white shadow-md rounded-md xl:w-full text-xs border min-[320px]:w-[38%] p-[20px] ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="date-picker" />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default CalendarCard;
