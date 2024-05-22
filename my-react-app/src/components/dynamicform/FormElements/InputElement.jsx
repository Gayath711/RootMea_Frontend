import React from "react";
import FormLabel from "./FormLabel";

const InputElement = ({ className, type, label, required, width, ...rest }) => {
  return (
    <div className={`m-1 ${width}`}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <input
        type={type}
        {...rest}
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
    </div>
  );
};

export default InputElement;
