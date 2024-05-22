import React from "react";
import FormLabel from "./FormLabel";
import Select from "react-select";

export default function MultiSelectElement({
  className,
  options, // [{ label: string, value: string }]
  name,
  label,
  value,
  required,
  onChange,
  disabled,
  placeholder,
  ...rest
}) {
  console.log(value, name);
  return (
    <div className="m-1">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <Select
        className={className}
        options={options.map((option) => {
          return {
            label: option.label || option,
            value: option.value || option,
          };
        })}
        isMulti
        name={name}
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
