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
  ...rest
}) {
  return (
    <div className="m-1">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <select
        className={`form-select ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option.label || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}
