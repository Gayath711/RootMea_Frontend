import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import EmergencyContact1 from "./EmergencyContact1";
import EmergencyContact2 from "./EmergencyContact2";
import OpenAccordianPNG from '../images/open-accordion.png';
import ClosedAccordianPNG from '../images/closed-accordion.png';

const ContactInformation = ({ id, isEdittable, clientData, handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const options = [
        { value: 'Option 1', label: 'Option 1' },
        { value: 'Option 2', label: 'Option 2' },
        { value: 'Option 3', label: 'Option 3' }
    ]
    return (
        <div className="border border-gray-300  bg-gray-50 rounded-md" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Contact Information</h2>

                    <p>Kindly provide complete and valid information for the Contact Information section.</p>
                </div>
                <img
                    src={isOpen ? OpenAccordianPNG : ClosedAccordianPNG}
                    alt={isOpen ? 'Open accordian' : 'Close accordion'}
                    className="ml-2 w-6 h-6"
                />
            </div>
            {
                isOpen && (
                    <>
                        <div className="p-4 border-t border-gray-300"></div>
                        <div className="border-1 border-gray-500/50 mx-4">
                            <div className="bg-gray-500/50 h-16 flex items-center p-2 text-lg font-medium ">
                                General Contact Information
                            </div>
                            <div className="p-4 border-t border-gray-300">
                                <div className="flex flex-col justify-between space-y-6">
                                    <div className="flex space-x-6">
                                        <div className="flex-1">
                                            <TextBox placeholder="First Name" isEdittable={isEdittable} value={clientData.first_name}
                                                handleChange={(e) => handleFieldChange('first_name', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Middle Name" isEdittable={isEdittable} value={clientData.middle_name}
                                                handleChange={(e) => handleFieldChange('middle_name', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Last Name" isEdittable={isEdittable} value={clientData.last_name}
                                                handleChange={(e) => handleFieldChange('last_name', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6">
                                        <div className="flex-1">
                                            <TextBox placeholder="Nick/Preferred Name" isEdittable={isEdittable} value={clientData.nickname_preferred_name}
                                                handleChange={(e) => handleFieldChange('nickname_preferred_name', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Preferred Pronouns" isEdittable={isEdittable} value={clientData.preferred_pronouns}
                                                handleChange={(e) => handleFieldChange('preferred_pronouns', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Email Address" isEdittable={isEdittable} value={clientData.email_address}
                                                handleChange={(e) => handleFieldChange('email_address', e.target.value)} />
                                        </div>

                                    </div>
                                    <div className="flex space-x-6">
                                        <div className="flex-1">
                                            <TextBox placeholder="Mobile Number" isEdittable={isEdittable} value={clientData.mobile_number}
                                                handleChange={(e) => handleFieldChange('mobile_number', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Home Phone Number" isEdittable={isEdittable} value={clientData.home_phone}
                                                handleChange={(e) => handleFieldChange('home_phone', e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <TextBox placeholder="Work Phone Number" isEdittable={isEdittable} value={clientData.work_phone}
                                                handleChange={(e) => handleFieldChange('work_phone', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6">
                                        <div className="flex-1">
                                            <DropDown placeholder="Best Way to Contact You" options={options} isEdittable={isEdittable} value={clientData.best_way_to_contact}
                                                handleChange={(e) => handleFieldChange('best_way_to_contact', e.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <DropDown placeholder="Primary Phone Number" options={options} isEdittable={isEdittable} value={clientData.primary_phone}
                                                handleChange={(e) => handleFieldChange('primary_phone', e.value)} />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6">
                                        <div className="flex-1">
                                            <DropDown placeholder="Preferred Language" options={options} isEdittable={isEdittable} value={clientData.comfortable_language}
                                                handleChange={(e) => handleFieldChange('comfortable_language', e.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <DropDown placeholder="Other Language" options={options} isEdittable={isEdittable} value={clientData.other_language}
                                                handleChange={(e) => handleFieldChange('other_language', e.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EmergencyContact1 heading={"Emergency Contact #1 Information"} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
                        <EmergencyContact2 heading={"Emergency Contact #2 Information"} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
                    </>
                )
            }
        </div >
    );
};

export default ContactInformation;