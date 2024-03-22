import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import DateInput from "../common/DateInput";
import OpenAccordianPNG from '../images/open-accordion.png';
import ClosedAccordianPNG from '../images/closed-accordion.png';

const Demographics = ({ id, isEdittable, clientData, handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="border border-gray-300  bg-gray-50 rounded-md" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Demographics</h2>

                    <p>Kindly provide complete and valid information for the Demographics section.</p>
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
                        <div className="p-4 border-t border-gray-300">
                            <div className="flex flex-col justify-between space-y-6">
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <DateInput placeholder="Date of Birth" width={290} isEdittable={isEdittable} value={clientData.date_of_birth}
                                            handleChange={(selectedDate) => handleFieldChange('date_of_birth', selectedDate)} />
                                    </div>
                                    <div className="flex-1">
                                        <TextBox placeholder="Age" isEdittable={isEdittable} value={clientData.age}
                                            handleChange={(e) => handleFieldChange('age', e.target.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Sex" isEdittable={isEdittable} value={clientData.sex}
                                            handleChange={(e) => handleFieldChange('sex', e.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <TextBox placeholder="Social Security Number" isEdittable={isEdittable} value={clientData.social_security_number}
                                            handleChange={(e) => handleFieldChange('social_security_number', e.target.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <TextBox placeholder="US Armed Forces" isEdittable={isEdittable} value={clientData.us_armed_forces}
                                            handleChange={(e) => handleFieldChange('us_armed_forces', e.target.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Ethinicity" isEdittable={isEdittable} value={clientData.us_armed_forces}
                                            handleChange={(e) => handleFieldChange('us_armed_forces', e.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <DropDown placeholder="Which Best describes the place you live now?" isEdittable={isEdittable} value={clientData.describe_the_place_you_live}
                                            handleChange={(e) => handleFieldChange('describe_the_place_you_live', e.value)} />
                                    </div>

                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <DropDown placeholder="Race" isEdittable={isEdittable} value={clientData.race}
                                            handleChange={(e) => handleFieldChange('race', e.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Other Race" isEdittable={isEdittable} value={clientData.other_race}
                                            handleChange={(e) => handleFieldChange('other_race', e.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Gender Identity" isEdittable={isEdittable} value={clientData.gender_identity}
                                            handleChange={(e) => handleFieldChange('gender_identity', e.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <DropDown placeholder="Other Gender Identity" isEdittable={isEdittable} value={clientData.other_gender_identity}
                                            handleChange={(e) => handleFieldChange('other_gender_identity', e.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Sexual Orientation" isEdittable={isEdittable} value={clientData.sexual_orientation}
                                            handleChange={(e) => handleFieldChange('sexual_orientation', e.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="Other Sexual Orientation" isEdittable={isEdittable} value={clientData.other_sexual_orientation}
                                            handleChange={(e) => handleFieldChange('other_sexual_orientation', e.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div >
    );
};

export default Demographics;