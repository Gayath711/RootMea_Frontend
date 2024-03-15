import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./CalendarStyles.css";

const CalendarCard = () => {
  const [date, setDate] = useState(null);
  return (
    <>
      <div className="bg-white shadow-md rounded-md xl:w-full text-xs border min-[320px]:w-[38%] ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default CalendarCard;
