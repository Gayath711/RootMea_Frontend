import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import DateInput from "../common/DateInput";

const Insurance = ({ heading }) => {
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
                                <TextBox placeholder="Enter Carrier Name" />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber ID" />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Subscriber Name" />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="Relation to Insured" />
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective From Date" />
                            </div>
                            <div className="flex-1">
                                <DateInput placeholder="Effective To Date" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Insurance;