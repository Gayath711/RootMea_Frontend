import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import TextArea from "../common/TextArea";
import OpenAccordianPNG from '../images/open-accordion.png';
import ClosedAccordianPNG from '../images/closed-accordion.png';

const AddressInformation = ({ id, isEdittable, clientData, handleFieldChange }) => {
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
                    <h2 className="text-lg font-medium">Address / Usual Information</h2>

                    <p>Kindly provide complete and valid information for the Address section.</p>
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
                                        <TextBox placeholder="Mailing Address Line 1" isEdittable={isEdittable} value={clientData.mailing_address_line_1_address_n_usual_location}
                                            handleChange={(e) => handleFieldChange('mailing_address_line_1_address_n_usual_location', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <TextBox placeholder="Mailing Address Line 2" isEdittable={isEdittable} value={clientData.mailing_address_line_2_address_n_usual_location}
                                            handleChange={(e) => handleFieldChange('mailing_address_line_2_address_n_usual_location', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <DropDown placeholder="City" isEdittable={isEdittable} options={options} value={clientData.city_address_n_usual_location}
                                            handleChange={(e) => handleFieldChange('city_address_n_usual_location', e.target.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown placeholder="State" isEdittable={isEdittable} options={options} value={clientData.state_address_n_usual_location}
                                            handleChange={(e) => handleFieldChange('state_address_n_usual_location', e.target.value)} />
                                    </div>
                                    <div className="flex-1">
                                        <TextBox placeholder="Valid Zip Code" isEdittable={isEdittable} value={clientData.zip_address_n_usual_location}
                                            handleChange={(e) => handleFieldChange('zip_address_n_usual_location', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <TextArea placeholder={`"Where can we usually find you, If different from your mailing address.\n[Add Address or, If unsheltered, specify cross street, encampment address, description of dwelling, etc. ]`}
                                            height={150}
                                            isEdittable={isEdittable}
                                            value={clientData.where_can_we_usually_find_you_if_different_from_mailing_address}
                                            handleChange={(e) => handleFieldChange('where_can_we_usually_find_you_if_different_from_mailing_address', e.target.value)}
                                        />
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

export default AddressInformation;