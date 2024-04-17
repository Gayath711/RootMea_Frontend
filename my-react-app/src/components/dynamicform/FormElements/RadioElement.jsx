import React from "react";
import FormLabel from "./FormLabel";

const RadioElement = ({ options, name, label,required,...rest }) => {
  return (
    <div className="m-1">
       <FormLabel required={required}>{label}</FormLabel>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`${name}-${index}`}
            name={name}
            value={option}
            {...rest}
          />
          <label htmlFor={`${name}-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioElement;
