import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormLabel from "./FormLabel";
import "react-datepicker/dist/react-datepicker.css";

function DateInput({
  type,
  label,
  value = null,
  onChange = () => {},
  className,
  required,
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
      <div className="m-1">
        <FormLabel required={required}>{label}</FormLabel>
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
    <div className="m-1">
      <FormLabel required={required}>{label}</FormLabel>
      <DatePicker
        className="border"
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
