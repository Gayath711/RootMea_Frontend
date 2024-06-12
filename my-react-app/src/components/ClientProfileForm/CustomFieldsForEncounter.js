


// import { useEffect, useMemo, useState } from "react";

// import DnDCustomFields from "../DnDCustomFields";

// import TextBox from "../common/TextBox";
// import OpenAccordianPNG from "../images/open-accordion.png";
// import ClosedAccordianPNG from "../images/closed-accordion.png";
// import axios from "../../helper/axiosInstance";
// import { notifySuccess } from "../../helper/toastNotication";

// const  = ({
//     id,
//     onChange,
//     dndItems,
//     viewMode,
//     mode,
//     editMode,
// }) => {
//     console.log(dndItems, "dndItems")

//     const convertToSample = (input) => {
        
//         return input.map(item => {
//             return {
//                 "type": "text",
//                 "props": {
//                     "label": item?.column_fullname,
//                     "value": "",
//                     "width": item.width,
//                     "type": "text",
//                     "disabled": true
//                 },
//                 "answer": "",
//                 "datatype": "text",
//                 "question": item?.column_fullname
//             };
//         });
//     };

//     dndItems = convertToSample(dndItems);



//     console.log(dndItems, "after conversion");
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleAccordion = () => {
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         if (dndItems.length > 0) {
//             if (!isOpen) {
//                 setIsOpen(true);
//             }
//         }
//     }, [dndItems]);

    

//     const convertedDndItems = dndItems;
//     return (
//         <div
//             className="border border-gray-300  bg-gray-50 rounded-md"
//             id={`accordian-${id}`}
//         >
//             <div
//                 className="flex items-center justify-between p-4 cursor-pointer"
//                 onClick={toggleAccordion}
//             >
//                 <div>
//                     <h2 className="text-lg font-medium">Custom Fields</h2>

//                     <p>Custom fields for the client profiles.</p>
//                 </div>
//                 <img
//                     src={isOpen ? OpenAccordianPNG : ClosedAccordianPNG}
//                     alt={isOpen ? "Open accordian" : "Close accordion"}
//                     className="ml-2 w-6 h-6"
//                 />
//             </div>
//             {isOpen && (
//                 <>
//                     <div className="p-4 border-t border-gray-300">
//                         <div className="flex flex-col justify-between space-y-6">
//                             <DnDCustomFields
//                                 onChange={onChange}
//                                 dndItems={convertedDndItems}
//                                 viewMode={viewMode}
//                                 editMode={editMode}
//                             />
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CustomFieldsForEncounter;


import { useEffect, useMemo, useState } from "react";

import DnDCustomFields from "../DnDCustomFields";

import TextBox from "../common/TextBox";
import OpenAccordianPNG from "../images/open-accordion.png";
import ClosedAccordianPNG from "../images/closed-accordion.png";
import axios from "../../helper/axiosInstance";
import { notifySuccess } from "../../helper/toastNotication";

const CustomFieldsForEncounter = ({
  id,
  onChange,
  dndItems,
  viewMode,
  mode,
  refresh,
  setMode,
}) => {
    console.log(dndItems, "dndItems");
    
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setMode(mode);
    if (dndItems.length > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [dndItems]);

  let customFieldsTags = useMemo(() => {
    return dndItems.map((field) => {
        console.log(field, "field")
      let cf = {
        datatype: "text",
        question: field.column_fullname,
        answer: "",
      };

      if (field.type === "imageupload" || field.type === "fileupload") {
        cf.answer = field.props.base64;
      } else {
        cf.answer = field.column_fullname;
      }

      if (mode === "edit") {
        if (field.id) {
          cf.id = field.id;
        }
      }

      return cf;
    });
  }, [dndItems]);

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
      setIsLoading(true);
      const formDataPayload = await handleCreatePayload();
      const response = await axios.put(
        "/client/update_custom_field/",
        formDataPayload
      );
      if (response.status === 200) {
        notifySuccess("Custom fields updated successfully");
        refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

      const convertToSample = (input) => {
        
        return input.map(item => {
            return {
                "type": "text",
                "props": {
                    "label": item?.column_fullname,
                    "value": "",
                    "width": item.width,
                    "type": "text",
                    "disabled": true
                },
                "answer": "",
                "datatype": "text",
                "question": item?.column_fullname
            };
        });
    };

    dndItems = convertToSample(dndItems);

    let convertedDndItems = dndItems;
console.log(convertedDndItems);

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
                onChange={onChange}
                dndItems={convertedDndItems}
                viewMode={viewMode}
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                onClick={handleSave}
                className="bg-teal-400 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-2 hidden"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Save Custom Fields"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomFieldsForEncounter;

