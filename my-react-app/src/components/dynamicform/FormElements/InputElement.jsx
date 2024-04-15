import React from "react";
import FormLabel from "./FormLabel";

const InputElement = ({ type, label, required, ...rest }) => {
  return (
    <div className="m-1">
      <FormLabel required={required}>{label}</FormLabel>
      <input
        type={type}
        {...rest}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputElement;
