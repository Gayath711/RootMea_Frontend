import React from "react";
import FormLabel from "./FormLabel";

const HeaderElement = ({ className, type, label, ...rest }) => {
  // const Text = React.createElement(type === "header" ? "h1" : "h2", {});
  return (
    <div className="m-1">
      <h1
        className={`w-full text-gray-700 ${
          type === "header" ? "font-bold text-base py-2 " : "text-xs py-1"
        } ${className}`}
        {...rest}
      >
        {label}
      </h1>
    </div>
  );
};

export default HeaderElement;
