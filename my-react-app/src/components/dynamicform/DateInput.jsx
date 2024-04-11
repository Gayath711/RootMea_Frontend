import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput({
  type,
  value = null,
  onChange = () => {},
  className,
  disabled,
  stateless,
}) {
  const [date, setDate] = useState(null);
  const handleChange = (selectedDate) => {
    let event = {
      target: {
        value: null,
      },
    };
    event.target.value = selectedDate;
    onChange(event);
  };

  const dateValue = value ? new Date(value) : value;

  if (stateless) {
    return (
      <div>
        {/* <label htmlFor="dateInput">Select a date:</label> */}
        <DatePicker
          showIcon
          id="dateInput"
          selected={date}
          onChange={(newDate) => {
            console.log(newDate);
            setDate(newDate);
          }}
          dateFormat="MM/dd/yyyy" // Set the desired date format here
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          disabled={disabled}
          placeholderText="  MM/DD/YYYY"
        />
      </div>
    );
  }

  return (
    <div>
      {/* <label htmlFor="dateInput">Select a date:</label> */}
      <DatePicker
        showIcon
        id="dateInput"
        selected={dateValue}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy" // Set the desired date format here
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        disabled={disabled}
        placeholderText="  MM/DD/YYYY"
      />
    </div>
  );
}

export default DateInput;
