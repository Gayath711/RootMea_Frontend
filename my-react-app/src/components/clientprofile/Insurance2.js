import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import DateInput from "../common/DateInput";

const Insurance = ({ heading, clientData }) => {
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
                                <TextBox placeholder="Enter Carrier Name" value={clientData.insurance_secondary_carrier_name}/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber ID" value={clientData.insurance_secondary_subscriber_id}/>
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber Name" value={clientData.insurance_secondary_subscriber_name}/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="Relation to Insured" value={clientData.insurance_secondary_relation_to_insured}/>
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective From Date" value={clientData.insurance_secondary_effective_from }/>
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective To Date" value={clientData.insurance_secondary_effective_to}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Insurance;