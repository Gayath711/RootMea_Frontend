import React, { useState, useEffect } from "react";
import TextBox from "../common/TextBox";
import DropDown from "../common/Dropdown";
import OpenAccordianPNG from '../images/open-accordion.png';
import ClosedAccordianPNG from '../images/closed-accordion.png';
import axios from 'axios';
import DateInput from '../common/DateInput';

const ContactInformation = () => {
  
    const token = localStorage.getItem('access_token');

    const [isEditable, setIsEditable] = useState(false)

    const [clientData, setClientData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        sex: '',
        date_of_birth: '',
        mobile_number: '',
        home_phone: '',
        work_phone: '',
        best_way_to_contact: '',
        primary_phone: '',
        comfortable_language: '',
        other_language: ''
    });

    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const options = [
        { value: 'Option 1', label: 'Option 1' },
        { value: 'Option 2', label: 'Option 2' },
        { value: 'Option 3', label: 'Option 3' }
    ]

    const handleFieldChange = (field, value) => {
        setClientData((prevInfo) => ({
          ...prevInfo,
          [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Submitting clientData:', clientData); // Log clientData
        axios.post(`http://localhost:8000/clientinfo-api/`, clientData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
            alert("Sucessfully created")
            console.log('Data submitted successfully:', response.data);
            // Add any additional handling after successful submission
        })
        .catch(error => {
            console.error('Error submitting Client Data:', error);
        });
    };
    


    return (
        <div className="border border-gray-300 bg-gray-50 rounded-md">
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Client Form</h2>
                    <p>Kindly provide complete and valid information for the General Information section.</p>
                </div>
            </div>

            <div className="p-4 border-t border-gray-300"></div>
            <div className="border-1 border-gray-500/50 mx-4">
                <div className="bg-gray-500/50 h-16 flex items-center p-2 text-lg font-medium ">
                    General Information
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="First Name" isEdittable={isEditable} value={clientData.first_name}
                                    handleChange={(e) => handleFieldChange('first_name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Middle Name" isEdittable={isEditable} value={clientData.middle_name}
                                    handleChange={(e) => handleFieldChange('middle_name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Last Name" isEdittable={isEditable} value={clientData.last_name}
                                    handleChange={(e) => handleFieldChange('last_name', e.target.value)} />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <DateInput placeholder="Date of Birth" width={290} isEdittable={isEditable} value={clientData.date_of_birth}
                                            handleChange={(selectedDate) => handleFieldChange('date_of_birth', selectedDate)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Gender" isEdittable={isEditable} value={clientData.sex}
                                    handleChange={(e) => handleFieldChange('sex', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Mobile Number" isEdittable={isEditable} value={clientData.mobile_number}
                                    handleChange={(e) => handleFieldChange('mobile_number', e.target.value)} />
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <TextBox placeholder="email_address" isEdittable={isEditable} value={clientData.email_address}
                                    handleChange={(e) => handleFieldChange('email_address', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Home Phone Number" isEdittable={isEditable} value={clientData.home_phone}
                                    handleChange={(e) => handleFieldChange('home_phone', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <TextBox placeholder="Work Phone Number" isEdittable={isEditable} value={clientData.work_phone}
                                    handleChange={(e) => handleFieldChange('work_phone', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ContactInformation;
