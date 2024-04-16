import React from "react";

// DnD Kit

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

// Elements
import InputElement from "../FormElements/InputElement";
import TextAreaElement from "../FormElements/TextAreaElement";
import CheckBoxElement from "../FormElements/CheckBoxElement";
import RadioElement from "../FormElements/RadioElement";
import DateInput from "../FormElements/DateInput";
import { useFormBuilderContext } from "./Context/FormBuilderContext";
import ActionContextMenu from "./ActionContextMenu";

function FieldElement({ field, index, id, preview }) {
  const { setSelectedElement, selectedElement } = useFormBuilderContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        index,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const key = `${field.type}_${id}`;
  let inputElement;
  switch (field.type) {
    case "VARCHAR(250)":
    case "INTEGER":
      {
        inputElement = <InputElement {...field.props} />;
      }
      break;
    case "TEXT":
      {
        inputElement = <TextAreaElement {...field.props} />;
      }
      break;
    case "checkbox":
      {
        inputElement = <CheckBoxElement {...field.props} />;
      }
      break;
    case "TIMESTAMP":
      {
        inputElement = <DateInput {...field.props} />;
      }
      break;

    default:
      inputElement = null;
  }

  if (preview) {
    return <div data-id={index}>{inputElement}</div>;
  }

  const isSelectedElement = selectedElement === index;

  return (
    <div
      data-id={index}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(index);
        console.log("on sel ele");
      }}
      className={`relative ${
        isSelectedElement
          ? "outline-teal-400 outline outline-2 outline-offset-1"
          : ""
      }`}
    >
      {inputElement}
      {isSelectedElement && (
        <span className="absolute right-[-0.5%] top-[103%] z-40">
          <ActionContextMenu />
        </span>
      )}
    </div>
  );
}

export default FieldElement;
