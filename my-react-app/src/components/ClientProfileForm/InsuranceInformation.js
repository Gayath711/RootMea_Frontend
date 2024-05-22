import { useState } from "react";

import OpenAccordianPNG from "../images/open-accordion.png";
import ClosedAccordianPNG from "../images/closed-accordion.png";
import Insurance from "./Insurance";

const InsuranceInformation = ({
  id,
  isEdittable,
  clientData,
  handleFieldChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
          <h2 className="text-lg font-medium">Insurance Information</h2>

          <p>
            Kindly provide complete and valid information for the Insurance
            Information section.
          </p>
        </div>
        <img
          src={isOpen ? OpenAccordianPNG : ClosedAccordianPNG}
          alt={isOpen ? "Open accordian" : "Close accordion"}
          className="ml-2 w-6 h-6"
        />
      </div>
      {isOpen && (
        <>
          <div className="p-4 border-t border-gray-300"></div>
          <Insurance
            heading={"Primary - Insurance"}
            isEdittable={isEdittable}
            clientData={clientData}
            handleFieldChange={handleFieldChange}
            insurancePrefix="insurance_primary"
          />
          <Insurance
            heading={"Secondary - Insurance"}
            isEdittable={isEdittable}
            clientData={clientData}
            handleFieldChange={handleFieldChange}
            insurancePrefix="insurance_secondary"
          />
          <Insurance
            heading={"Tertiary - Insurance"}
            isEdittable={isEdittable}
            clientData={clientData}
            handleFieldChange={handleFieldChange}
            insurancePrefix="insurance_tertiary"
          />
        </>
      )}
    </div>
  );
};

export default InsuranceInformation;
