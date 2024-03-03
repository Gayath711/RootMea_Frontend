import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import DateInput from "../common/DateInput";

const Insurance = ({ heading, isEdittable, clientData,  handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="">
            <div className="border-1 border-gray-500/50 mx-4 mb-4">
                <div className="bg-gray-500/50 h-16 flex items-center p-2 text-lg font-semibold">
                    {heading}
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Carrier Name" isEdittable={isEdittable} value={clientData.insurance_secondary_carrier_name}
                                handleChange={(e) => handleFieldChange('insurance_secondary_carrier_name', e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber ID" isEdittable={isEdittable} value={clientData.insurance_secondary_subscriber_id}
                                handleChange={(e) => handleFieldChange('insurance_secondary_subscriber_id', e.target.value)}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber Name" isEdittable={isEdittable} value={clientData.insurance_secondary_subscriber_name}
                                handleChange={(e) => handleFieldChange('insurance_secondary_subscriber_name', e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="Relation to Insured" isEdittable={isEdittable} value={clientData.insurance_secondary_relation_to_insured}
                                handleChange={(e) => handleFieldChange('insurance_secondary_relation_to_insured', e.target.value)}/>
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective From Date" isEdittable={isEdittable} value={clientData.insurance_secondary_effective_from}
                                handleChange={(selectedDate) => handleFieldChange('insurance_secondary_effective_from', selectedDate)}/>
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective To Date" isEdittable={isEdittable} value={clientData.insurance_secondary_effective_to}
                                handleChange={(selectedDate) => handleFieldChange('insurance_secondary_effective_to', selectedDate)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Insurance;