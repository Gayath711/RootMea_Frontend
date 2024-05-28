import { useEffect, useMemo, useState } from "react";

import DnDCustomFields from "../DnDCustomFields";

import TextBox from "../common/TextBox";
import OpenAccordianPNG from "../images/open-accordion.png";
import ClosedAccordianPNG from "../images/closed-accordion.png";
import axios from "../../helper/axiosInstance";
import { notifySuccess } from "../../helper/toastNotication";

const CustomFieldsForUser = ({
  id,
  isEdittable,
  fields,
  handleFieldChange,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [customFields, setCustomFields] = useState([]);

  console.log({ cffu: fields, customFields });

  useEffect(() => {
    // fetchData();
    setCustomFields(parseToDnDCustomFields(fields));
  }, []);

  let mode = "edit";
  let customFieldsTags = useMemo(() => {
    return customFields.map((field) => {
      let cf = {
        datatype: field.type,
        question: field.props.label,
        answer: "",
      };

      if (field.type === "imageupload" || field.type === "fileupload") {
        cf.answer = field.props.base64;
      } else {
        cf.answer = field.props.value;
      }

      if (mode === "edit") {
        if (field.id) {
          cf.id = field.id;
        }
      }

      return cf;
    });
  }, [customFields]);

  useEffect(() => {
    onChange && onChange("custom_fields", customFieldsTags);
  }, [customFieldsTags]);

  const parseToDnDCustomFields = (items) => {
    if (!items.some((im) => Boolean(im?.id))) {
      return [];
    }
    return items.map((itm) => {
      let constructField = {
        type: itm.datatype,
        props: {
          label: itm.question,
          value: itm.answer,
          width: "w-full",
        },
        ...itm,
      };

      if (itm.datatype === "text" || itm.datatype === "textarea") {
        constructField.props = {
          ...constructField.props,
          type: "text",
        };
      }

      if (itm.datatype === "datetime") {
        constructField.props = {
          ...constructField.props,
          type: "date",
          width: "w-1/4",
        };
      }

      if (itm.datatype === "imageupload") {
        constructField.props = {
          ...constructField.props,
          type: "file",
          accept: "image/*",
          base64: itm.answer,
        };
      }

      if (itm.datatype === "imageupload") {
        constructField.props = {
          ...constructField.props,
          type: "file",
          accept:
            ".png, .jpg, .jpeg, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          type: "file",
          isFile: true,
          base64: itm.answer,
        };
      }

      return constructField;
    });
  };

  const handleCreatePayload = () => {
    const formDataPayload = new FormData();

    // DND Custom Fields

    // let tags = customFields.map((field) => {
    //   console.log({ xx_field: field });
    //   let answer = "";
    //   if (field.type === "imageupload" || field.type === "fileupload") {
    //     answer = field.props.base64;
    //   } else {
    //     answer = field.props.value;
    //   }

    //   console.log({
    //     xx_rEle: {
    //       datatype: field.type,
    //       question: field.props.label,
    //       answer: answer,
    //     },
    //   });
    //   return {
    //     datatype: field.type,
    //     question: field.props.label,
    //     answer: answer,
    //   };
    // });

    formDataPayload.append("tags", JSON.stringify(customFieldsTags || []));
    return formDataPayload;
  };

  const handleSave = async () => {
    try {
      const formDataPayload = await handleCreatePayload();
      const response = await axios.put(
        "/client/update_custom_field/",
        formDataPayload
      );
      if (response.status === 200) {
        notifySuccess("Custom fields updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="border border-gray-300  bg-gray-50 rounded-md"
      id={`accordian-${id}`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div>
          <h2 className="text-lg font-medium">Custom Fields For All</h2>

          <p>Add custom fields for all the client profiles.</p>
        </div>
        <img
          src={isOpen ? OpenAccordianPNG : ClosedAccordianPNG}
          alt={isOpen ? "Open accordian" : "Close accordion"}
          className="ml-2 w-6 h-6"
        />
      </div>
      {isOpen && (
        <>
          <div className="p-4 border-t border-gray-300">
            <div className="flex flex-col justify-between space-y-6">
              <DnDCustomFields
                onChange={(dndItms) => {
                  setCustomFields(dndItms);
                }}
                dndItems={customFields}
                viewMode={true}
                editMode={true}
                config={{
                  enableAnswer: true,
                  enableQuestion: true,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomFieldsForUser;
