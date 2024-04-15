import React, { useState, useMemo, useRef } from "react";

// Icons

import Attachments_Icon from "../../images/form_builder/attachments.svg";
import Image_upload_Icon from "../../images/form_builder/image_upload.svg";
import Drop_down_Icon from "../../images/form_builder/drop_down.svg";
import Check_box_Icon from "../../images/form_builder/check_box.svg";
import Date_Icon from "../../images/form_builder/date.svg";
import Time_Icon from "../../images/form_builder/time.svg";
import Date_and_time_Icon from "../../images/form_builder/date_and_time.svg";
import Number_Icon from "../../images/form_builder/number.svg";
import Single_line_text_Icon from "../../images/form_builder/single_line_text.svg";
import Text_area_Icon from "../../images/form_builder/text_area.svg";
import Radio_button_Icon from "../../images/form_builder/radio_button.svg";
import DraggableIcon from "../../images/form_builder/draggable.svg";
import ElementsBar from "./ElementsBar";
import FormCanvas from "./FormCanvas";

function FormBuilder() {
  const [items, setItems] = useState([
    {
      type: "VARCHAR(250)",
      label: "Text",
      IconSrc: Single_line_text_Icon,
      props: {
        type: "text",
        label: "New Text",
        placeholder: "Enter new text",
        required: false,
        disabled: false,
      },
    },
    {
      type: "TEXT",
      label: "TextArea",
      IconSrc: Text_area_Icon,
      props: {
        type: "text",
        label: "New Text Area",
        placeholder: "Enter new text",
        required: false,
        disabled: false,
      },
    },
    {
      type: "INTEGER",
      label: "Number",
      IconSrc: Number_Icon,
      props: {
        type: "number",
        label: "New Number",
        placeholder: "Enter a number",
        required: false,
        disabled: false,
      },
    },

    {
      type: "TIMESTAMP",
      label: "Date and Time",
      IconSrc: Date_and_time_Icon,
      props: {
        type: "date",
        label: "New Date",
        required: false,
        disabled: false,
      },
    },
    {
      type: "my_enum_type",
      label: "Dropdown",
      IconSrc: Drop_down_Icon,
      props: {
        type: "text",
        label: "New Drop Down",
        required: false,
        disabled: true,
        options: ["option-1", "option-2", "option-3"],
      },
    },
    {
      type: "my_enum_typeb",
      label: "Multiple Select",
      IconSrc: Drop_down_Icon,
      props: {
        type: "text",
        label: "New Multi select",
        required: false,
        disabled: true,
        options: ["option-1", "option-2", "option-3"],
      },
    },
    {
      type: "checkbox",
      label: "Checkbox",
      IconSrc: Check_box_Icon,
      props: {
        type: "text",
        label: "New Check box",
        required: false,
        disabled: true,
        options: ["option-1", "option-2", "option-3"],
      },
    },
  ]);

  // Define your element groups and their corresponding elements
  const elementGroups = [
    {
      name: "Text Elements",
      elements: [
        {
          type: "VARCHAR(250)",
          label: "Text",
          IconSrc: Single_line_text_Icon,
          props: {
            type: "text",
            label: "New Text",
            placeholder: "Enter new text",
            required: false,
            disabled: false,
          },
        },
        {
          type: "TEXT",
          label: "TextArea",
          IconSrc: Text_area_Icon,
          props: {
            type: "text",
            label: "New Text Area",
            placeholder: "Enter new text",
            required: false,
            disabled: false,
          },
        },
        {
          type: "INTEGER",
          label: "Number",
          IconSrc: Number_Icon,
          props: {
            type: "number",
            label: "New Number",
            placeholder: "Enter a number",
            required: false,
            disabled: false,
          },
        },
      ],
    },
    {
      name: "Date Elements",
      elements: [
        // { type: "FLOAT", label: "Decimal", IconSrc: file },
        // { type: "BOOLEAN", label: "Boolean", IconSrc: file },
        {
          type: "TIMESTAMP",
          label: "Date and Time",
          IconSrc: Date_and_time_Icon,
          props: {
            type: "date",
            label: "New Date",
            required: false,
            disabled: false,
          },
        },
      ],
    },
    {
      name: "Multi Elements",
      elements: [
        {
          type: "my_enum_type",
          label: "Dropdown",
          IconSrc: Drop_down_Icon,
          props: {
            type: "text",
            label: "New Drop Down",
            required: false,
            disabled: true,
            options: ["option-1", "option-2", "option-3"],
          },
        },
        {
          type: "my_enum_typeb",
          label: "Multiple Select",
          IconSrc: Drop_down_Icon,
          props: {
            type: "text",
            label: "New Multi select",
            required: false,
            disabled: true,
            options: ["option-1", "option-2", "option-3"],
          },
        },
        {
          type: "checkbox",
          label: "Checkbox",
          IconSrc: Check_box_Icon,
          props: {
            type: "text",
            label: "New Check box",
            required: false,
            disabled: true,
            options: ["option-1", "option-2", "option-3"],
          },
        },
      ],
    },

    // {
    //   name: "Media Elements",
    //   elements: [
    //     { type: "BYTEA", label: "Image Upload", IconSrc: Image_upload_Icon },
    //     { type: "BYTEA", label: "File Upload", IconSrc: Attachments_Icon },
    //   ],
    // },
  ];
  return (
    <div className="row">
      {/* Draggable Elements */}
      <div className="col-sm-4 p-2">
        <ElementsBar elementGroups={elementGroups} />
      </div>

      {/* Form Drop Zone */}
      <div className="col-sm-8 p-2">
        <FormCanvas items={items} />
      </div>
    </div>
  );
}

export default FormBuilder;
