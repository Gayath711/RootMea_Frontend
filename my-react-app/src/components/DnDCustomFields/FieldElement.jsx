import React, { useState } from "react";

// DnD Kit

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

// Elements
import InputElement from "../dynamicform/FormElements/InputElement";
import TextAreaElement from "../dynamicform/FormElements/TextAreaElement";
import CheckBoxElement from "../dynamicform/FormElements/CheckBoxElement";
import RadioElement from "../dynamicform/FormElements/RadioElement";
import DateInput from "../dynamicform/FormElements/DateInput";
import { useDnDCustomFieldsContext } from "./Context/DnDCustomFieldsContext";
import ActionContextMenu from "./ActionContextMenu";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import SelectElement from "../dynamicform/FormElements/SelectElement";
import MultiSelectElement from "../dynamicform/FormElements/MultiSelectElement";
import HeaderElement from "../dynamicform/FormElements/HeaderElement";
import DividerElement from "../dynamicform/FormElements/DividerElement";
import FieldProperty from "./FieldProperty";

function FieldElement({ field, index, id, preview }) {
  const { setSelectedElement, selectedElement } = useDnDCustomFieldsContext();

  console.log({ field, selectedElement });

  const key = `${field.type}_${id}`;
  let inputElement;
  switch (field.type) {
    case "text":
    case "imageupload":
    case "fileupload":
      {
        inputElement = <InputElement {...field.props} />;
      }
      break;
    case "textarea":
      {
        inputElement = <TextAreaElement {...field.props} />;
      }
      break;
    case "datetime":
      {
        inputElement = <DateInput {...field.props} />;
      }
      break;
    case "divider":
      {
        inputElement = <DividerElement />;
      }
      break;

    default:
      inputElement = null;
  }

  if (preview) {
    return <div data-id={index}>{inputElement}</div>;
  }

  // return (
  //   <div
  //     data-id={index}
  //     onClick={(e) => {
  //       e.stopPropagation();
  //       setSelectedElement(index);
  //     }}
  //     className={`relative ${
  //       isSelectedElement
  //         ? "outline-teal-400 outline outline-2 outline-offset-1"
  //         : ""
  //     }`}
  //   >
  //     {inputElement}
  //     {isSelectedElement && (
  //       <span className="absolute right-[-0.5%] top-[103%] z-40">
  //         <ActionContextMenu />
  //       </span>
  //     )}
  //   </div>
  // );

  return (
    <FieldElementWrapper index={index} field={field}>
      {inputElement}
    </FieldElementWrapper>
  );
}

export default FieldElement;

function FieldElementWrapper({ index, field, children }) {
  const { selectedElement, setSelectedElement } = useDnDCustomFieldsContext();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const topHalf = useDroppable({
    id: index + "-top",
    data: {
      index: index,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: index + "-bottom",
    data: { index: index, isBottomHalfDesignerElement: true },
  });

  const draggable = useDraggable({
    id: index + "-drag-handler",
    data: {
      index: index,
      element: field,
      isDesignerElement: true,
    },
  });

  const isSelectedElement = selectedElement === index;

  if (draggable.isDragging) return null; // temporary remove the element from designer

  return (
    <>
      <div
        // ref={draggable.setNodeRef}
        // {...draggable.listeners}
        // {...draggable.attributes}
        className={`relative h-auto flex flex-col text-foreground hover:cursor-pointer rounded-md ${
          topHalf.isOver || bottomHalf.isOver
            ? "ring-1 ring-accent ring-inset"
            : ""
        } ${
          isSelectedElement
            ? "outline-teal-400 outline outline-2 outline-offset-1"
            : ""
        }`}
        // onMouseEnter={() => {
        //   setMouseIsOver(true);
        // }}
        // onMouseLeave={() => {
        //   setMouseIsOver(false);
        // }}
        onClick={(e) => {
          console.log("clickedd...");
          console.log({ index });
          e.stopPropagation();
          if (selectedElement === index) {
            setSelectedElement(null);
          } else {
            setSelectedElement(index);
          }
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className="absolute w-full h-1/2 rounded-t-md"
        />
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute  w-full bottom-0 h-1/2 rounded-b-md"
        />

        {topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
        )}
        <div className="flex w-full h-auto items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100">
          {children}
        </div>

        {bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
        )}
        {isSelectedElement && (
          <span className="absolute right-[-0.5%] top-[103%] z-40">
            <ActionContextMenu />
          </span>
        )}
      </div>
      {index === selectedElement && field.type !== "divider" && (
        <FieldProperty />
      )}
    </>
  );
}
