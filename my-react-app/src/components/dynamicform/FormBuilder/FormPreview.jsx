import React from "react";
import { useFormBuilderContext } from "./Context/FormBuilderContext";
import FieldElement from "./FieldElement";

import CloseIcon from "../../images/form_builder/close_x.svg";
import { Modal } from "react-bootstrap";

function FormPreview() {
  const {
    elements: items,
    formDetail,
    showPreview,
    togglePreview,
  } = useFormBuilderContext();

  console.log({ formDetail });

  return (
    <Modal show={showPreview} onHide={() => togglePreview()}>
      <Modal.Header className="m-0 p-2 w-100 text-white text-base bg-[#5BC4BF] font-medium">
        <Modal.Title className="m-0 p-0 w-100">
          <div className="flex justify-between items-center w-100">
            <span className="text-white text-base">
              Form: {formDetail.formName}
            </span>
            <button onClick={() => togglePreview()}>
              <img
                src={CloseIcon}
                style={{
                  height: "20px",
                  width: "100%",
                }}
              />
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-column p-2">
          {items.length === 0 ? (
            <div
              className="w-100 h-100 flex flex-column items-center justify-center gap-2 p-2 pt-[40px]"
              style={{
                maxHeight: "calc(80vh - 56px)",
              }}
            >
              <p className="text-md text-bold m-0">Form has no fields</p>
              <p className="text-xs text-gray-300 m-0">Nothing to preview</p>
            </div>
          ) : (
            items.map((item, index) => {
              const key = `${item.type}_${index}`;
              return (
                <FieldElement
                  key={key}
                  field={item}
                  id={key}
                  index={index}
                  preview={true}
                />
              );
            })
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between p-2 w-100">
          <button className="bg-white p-2 px-3 text-gray-700 border-1 border-gray-600 text-xs">
            Save
          </button>
          <button className="bg-[#5BC4BF] p-2 px-3 text-white text-xs">
            Submit
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default FormPreview;
