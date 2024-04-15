import React from "react";

// Elements
import InputElement from "../FormElements/InputElement";
import TextAreaElement from "../FormElements/TextAreaElement";
import CheckBoxElement from "../FormElements/CheckBoxElement";
import RadioElement from "../FormElements/RadioElement";
import DateInput from "../FormElements/DateInput";

function FormCanvas({ items = [] }) {
  return (
    <div className="flex flex-column border-2 border[#858585]">
      <div className="w-100 bg-[#ECECEC]">
        <div className="row p-4">
          <div className="col-sm-12 p-2">
            <label
              htmlFor="tableName"
              className="text-xs font-medium text-gray-500"
            >
              Form name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              id="tableName"
              // value={tableName}
              placeholder="Enter Form name..."
              // onChange={handleTableNameChange}
              className="border border-gray-300 rounded px-4 mt-2 py-2 w-100 focus:outline-none focus:border-green-500 transition-colors duration-300"
            />
          </div>
          <div className="hidden col-sm-5 p-2">
            <label
              htmlFor="tableName"
              className="text-xs font-medium text-gray-500"
            >
              Number of columns
            </label>

            <input
              // id="tableName"
              // value={tableName}
              value={0}
              type="number"
              placeholder="Select Columns"
              // onChange={handleTableNameChange}
              className="border border-gray-300 rounded px-4 mt-2 py-2 w-100 focus:outline-none focus:border-green-500 transition-colors duration-300"
            />
          </div>
        </div>
      </div>
      <div
        className="p-3"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 56px)",
        }}
      >
        {items.length === 0 ? (
          <div
            className="w-100 h-100 flex flex-column items-center justify-center gap-2 p-2 pt-[40px]"
            style={{
              maxHeight: "calc(80vh - 56px)",
            }}
          >
            {/* <img
            src={DraggableIcon}
            alt="empty-dropzone"
            width={"65px"}
            height={"100%"}
          /> */}
            <p className="text-md text-bold m-0">Select an element to add</p>
            <p className="text-xs text-gray-300 m-0">Nothing to select</p>
          </div>
        ) : (
          items.map((item, index) => {
            console.log({ item });
            const key = `${item.type}_${index}`;
            let inputElement;
            switch (item.type) {
              case "VARCHAR(250)":
              case "INTEGER":
                {
                  inputElement = <InputElement {...item.props} />;
                }
                break;
              case "TEXT":
                {
                  inputElement = <TextAreaElement {...item.props} />;
                }
                break;
              case "checkbox":
                {
                  inputElement = <CheckBoxElement {...item.props} />;
                }
                break;
              case "TIMESTAMP":
                {
                  inputElement = <DateInput {...item.props} />;
                }
                break;

              default:
                inputElement = null;
            }

            return <div key={key}>{inputElement}</div>;
          })
        )}
      </div>
      <div className="flex justify-center items-center gap-2 p-4">
        {/* Action Buttons */}
      </div>
    </div>
  );
}

export default FormCanvas;
