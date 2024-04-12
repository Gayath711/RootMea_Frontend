import Select from "react-select";
import { useState } from "react";

const DropDown = ({
  name,
  id = { name },
  placeholder,
  height = "7vh",
  borderColor = "#E5E7EA",
  isEdittable,
  value,
  handleChange,
  options,
  selectedOption,
}) => {
  const bgDisabled = isEdittable ? "#F6F7F7" : "white";
  const bgLabelDisabled = isEdittable ? "#F6F7F7" : "white";

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <Select
        name={name}
        id={id}
        options={options}
        placeholder=""
        defaultValue={{ value: selectedOption, label: selectedOption }}
        value={{ value: selectedOption, label: selectedOption }}
        // selectedOption={selectedOption}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        isDisabled={isEdittable}
        styles={{
          control: (styles) => ({
            ...styles,
            height: `${height}`,
            border: `1px solid ${borderColor}`,
            background: `${bgDisabled}`,
            fontSize: "1.125rem",
            borderRadius: "0.375rem",
          }),
          menu: (styles) => ({
            ...styles,
            background: "white",
            zIndex: 9999,
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
      <label
        htmlFor={id}
        className={`absolute px-2 text-sm text-gray-500 duration-300 transform ${
          isFocused || selectedOption
            ? "-translate-y-6 scale-75 top-4"
            : "translate-y-1/2 scale-100 top-1.5"
        } z-0 origin-[0] start-2.5 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
        style={{ background: bgLabelDisabled }}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default DropDown;
