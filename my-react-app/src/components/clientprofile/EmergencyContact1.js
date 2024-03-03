import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";

const EmergencyContact1 = ({ heading, isEdittable, clientData,  handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="">
            <div className="border-1 border-gray-500/50 m-4">
                <div className="bg-gray-500/50 h-16 flex items-center p-2 text-lg font-semibold">
                    {heading}
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Name" isEdittable={isEdittable} value={clientData.emergency_contact_1_name}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Email Address" isEdittable={isEdittable} value={clientData.emergency_contact_1_email_address}/>
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="Select Relationship" isEdittable={isEdittable} value={clientData.emergency_contact_1_relationship}/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Address Line #1" isEdittable={isEdittable} value={clientData.emergency_contact_1_address_line_1}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Address Line #2" isEdittable={isEdittable} value={clientData.emergency_contact_1_address_line_2}/>
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="Select City" isEdittable={isEdittable} value={clientData.emergency_contact_1_city}/>
                            </div>

                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="Select State" isEdittable={isEdittable} value={clientData.emergency_contact_1_state}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Zip Code" isEdittable={isEdittable} value={clientData.emergency_contact_1_zip}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Phone Number" isEdittable={isEdittable} value={clientData.emergency_contact_1_phone}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmergencyContact1;