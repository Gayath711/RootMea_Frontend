import React from "react";
import FormLabel from "./FormLabel";

export default function SelectElement({
  className,
  options, // [{ label: string, value: string }]
  name,
  label,
  value,
  required,
  onChange,
  placeholder = "Select",
  disabled=false,
  ...rest
}) {
  return (
    <div className="m-1">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <select
        className={`form-select disabled:bg-[#F2F2F2] ${className}`}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      >
        <option disabled value="" defaultChecked>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            disabled={option?.disabled === true ? true : false}
            key={index}
            value={option.value || option}
          >
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}
