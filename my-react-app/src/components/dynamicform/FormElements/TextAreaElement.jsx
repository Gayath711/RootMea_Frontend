import React from "react";
import FormLabel from "./FormLabel";

const TextAreaElement = ({
  className,
  label,
  required,
  width,
  disabled,
  ...rest
}) => {
  return (
    <div className={`m-1 ${width}`}>
      <FormLabel required={required}>{label}</FormLabel>
      <textarea
        {...rest}
        disabled={disabled}
        style={{ resize: "none" }} // Disable textarea resize
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
    </div>
  );
};

export default TextAreaElement;
