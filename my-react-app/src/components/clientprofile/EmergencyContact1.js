import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";

const EmergencyContact1 = ({ heading, isEdittable, clientData, handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="">
            <div className="border-1 border-gray-500/50 m-4">
                <div className="bg-gray-500/50 h-16 flex items-center p-2 text-lg font-medium">
                    {heading}
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Name" isEdittable={isEdittable} value={clientData.emergency_contact_1_name}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Email Address" isEdittable={isEdittable} value={clientData.emergency_contact_1_email_address}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_email_address', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="Relationship" isEdittable={isEdittable} value={clientData.emergency_contact_1_relationship}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_relationship', e.target.value)} />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Address Line #1" isEdittable={isEdittable} value={clientData.emergency_contact_1_address_line_1}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_address_line_1', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Address Line #2" isEdittable={isEdittable} value={clientData.emergency_contact_1_address_line_2}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_address_line_2', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="City" isEdittable={isEdittable} value={clientData.emergency_contact_1_city}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_city', e.target.value)} />
                            </div>

                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="State" isEdittable={isEdittable} value={clientData.emergency_contact_1_state}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_state', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Zip Code" isEdittable={isEdittable} value={clientData.emergency_contact_1_zip}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_zip', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Phone Number" isEdittable={isEdittable} value={clientData.emergency_contact_1_phone}
                                    handleChange={(e) => handleFieldChange('emergency_contact_1_phone', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmergencyContact1;