import React from "react";
import FormLabel from "./FormLabel";

const CheckBoxElement = ({
  options,
  label,
  direction = "column",
  required,
  ...rest
}) => {
  return (
    <div className="m-1">
      <FormLabel required={required}>{label}</FormLabel>
      <div
        className={`flex ${
          direction !== "row" ? "flex-column gap-2" : "flex-row gap-3"
        }`}
      >
        {options.map((option, index) => (
          <div key={index} className={`flex gap-1 items-center`}>
            <input
              type="checkbox"
              id={`${label}-${index}`}
              name={label}
              value={option}
            />
            <label htmlFor={`${label}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxElement;
