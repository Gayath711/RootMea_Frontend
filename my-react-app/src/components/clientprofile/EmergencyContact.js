import { useState } from "react";

import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";

const EmergencyContact = ({ heading, isEdittable }) => {
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
                                <TextBox placeholder="Enter Name" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Email Address" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="Select Relationship" isEdittable={isEdittable} />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="Enter Address Line #1" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Address Line #2" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <DropDown placeholder="Select City" isEdittable={isEdittable} />
                            </div>

                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DropDown placeholder="Select State" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Zip Code" isEdittable={isEdittable} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Enter Phone Number" isEdittable={isEdittable} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmergencyContact;