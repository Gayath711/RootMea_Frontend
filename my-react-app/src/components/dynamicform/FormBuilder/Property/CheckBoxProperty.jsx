import React from "react";
import { useFormBuilderContext } from "../Context/FormBuilderContext";

import InputElement from "../../FormElements/InputElement";
import CheckBoxElement from "../../FormElements/CheckBoxElement";

export default function CheckBoxProperty() {
  const { selectedElement, elements, updateElement } = useFormBuilderContext();
  const fieldElement = elements[selectedElement];

  const handlePropsChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const updatedElement = {
      ...fieldElement,
      props: {
        ...fieldElement.props,
        [name]: value,
      },
    };

    updateElement(selectedElement, updatedElement);
  };

  const handleCheckBoxProps = (e) => {
    const {
      target: { name, value, checked },
    } = e;

    const updatedElement = {
      ...fieldElement,
      props: {
        ...fieldElement.props,
        [name]: checked,
      },
    };

    updateElement(selectedElement, updatedElement);
  };

  const handleEnumChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const updatedElement = {
      ...fieldElement,
      props: {
        ...fieldElement.props,
        [name]: value.split(","),
      },
    };

    updateElement(selectedElement, updatedElement);
  };

  return (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-3 border-b-2 pb-3">
        <p className="text-[14px] font-medium mx-1">{`${fieldElement.label} properties`}</p>
        <InputElement
          className="m-0 p-0"
          type="text"
          name="label"
          value={fieldElement.props.label}
          placeholder="Enter Label"
          onChange={handlePropsChange}
        />
      </div>
      <div className="flex flex-column gap-3 pb-3">
        <InputElement
          className="m-0 p-0"
          type="text"
          name="options"
          label={"Options"}
          value={fieldElement.props.options.join(",")}
          placeholder="Comma separated values"
          onChange={handleEnumChange}
        />
      </div>
    </div>
  );
}