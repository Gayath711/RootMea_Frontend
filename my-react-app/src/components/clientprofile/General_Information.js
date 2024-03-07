import { useState } from "react";

import TextBox from "../common/TextBox";
import DateInput from "../common/DateInput";
import TestJPG from '../images/test.jpg';

const GeneralInformation = ({ id, isEdittable, clientData, handleFieldChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="border border-gray-300  bg-gray-50" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">General Information</h2>

                    <p>Kindly provide complete and valid information for the General Information section.</p>
                </div>
                <svg
                    className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.2988" cy="12.5" r="12.5" transform="rotate(-180 13.2988 12.5)" fill="#28293B" />
                    <path d="M5.51785 16.0377C5.51279 16.2498 5.57946 16.4582 5.7087 16.6337C5.83794 16.8093 6.02336 16.9433 6.23901 17.0172C6.45466 17.0911 6.68988 17.1012 6.91204 17.0461C7.1342 16.991 7.33212 16.8734 7.47847 16.7096L13.2806 10.4628L19.0806 16.7096C19.1709 16.8229 19.2854 16.9177 19.4173 16.9882C19.5491 17.0587 19.6953 17.1034 19.8467 17.1194C19.9981 17.1353 20.1514 17.1223 20.2971 17.0811C20.4428 17.0399 20.5777 16.9714 20.6934 16.8798C20.809 16.7883 20.9028 16.6757 20.9691 16.5492C21.0354 16.4226 21.0726 16.2848 21.0785 16.1444C21.0844 16.0039 21.0589 15.8639 21.0033 15.733C20.9478 15.6021 20.8636 15.4832 20.7559 15.3837L14.1215 8.23166C14.0176 8.11934 13.8886 8.02915 13.7432 7.96731C13.5978 7.90547 13.4396 7.87344 13.2795 7.87344C13.1195 7.87344 12.9612 7.90547 12.8159 7.96731C12.6705 8.02915 12.5414 8.11934 12.4375 8.23166L5.79666 15.3837C5.62267 15.5644 5.52401 15.7961 5.51785 16.0377Z" fill="white" />

                </svg>
            </div>
            {
                isOpen && (
                    <div className="p-4 border-t border-gray-300">

                        <div className="flex space-x-6">
                            <div className="border-1 w-[25.92vh] h-[32.40vh] border-1
                border-gray-600/50 bg-white rounded-md flex flex-col justify-center items-center">
                                <img src={require('../images/client-profile-1.png')} alt="Client Photo" className="w-28 h-28 object-cover" />
                                <div className="mt-4 text-center text-green-800">John Doe</div>
                            </div>

                            <div className="flex flex-col justify-between flex-1">
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <TextBox placeholder="Client Status" isEdittable={isEdittable} value={"Pending"} />
                                    </div>
                                    <div className="flex-1">
                                        <DateInput placeholder="Client Date" isEdittable={isEdittable} value={"2022-10-01"} />
                                    </div>
                                </div>
                                <TextBox placeholder="Client Programs" isEdittable={isEdittable} value={"STOMP"} />
                                <div className="flex space-x-6">
                                    <div className="flex-1">
                                        <TextBox placeholder="Client Navigator Name" isEdittable={isEdittable} value={"Laura"} />
                                    </div>
                                    <div className="flex-1">
                                        <TextBox placeholder="Client System ID" isEdittable={isEdittable} value={"54321a"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default GeneralInformation;