import React from "react";
import { useFormBuilderContext } from "../Context/FormBuilderContext";

import InputElement from "../../FormElements/InputElement";
import CheckBoxElement from "../../FormElements/CheckBoxElement";

export default function DateTimeProperty() {
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
        {/* <p className="text-[14px] font-medium mx-1">{`${fieldElement.label} properties`}</p> */}

        <CheckBoxElement
          options={[
            {
              label: "is Required",
              value: "required",
              checked: fieldElement.props.required,
            },
          ]}
          name={"required"}
          onChange={handleCheckBoxProps}
        />

        <CheckBoxElement
          options={[
            {
              label: "Disable",
              value: "disabled",
              checked: fieldElement.props.disabled,
            },
          ]}
          name={"disabled"}
          onChange={handleCheckBoxProps}
        />
      </div>
    </div>
  );
}
