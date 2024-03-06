import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

import { COLUMNS } from '../constants';
import '../css/mypanel.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TestJPG from '../images/test.jpg';


const ClientDetails = ({id}) => {

    const { clientId } = useParams();
    const token = localStorage.getItem('access_token');

    const [isOpen, setIsOpen] = useState(true);
    
    const [clientData, setClientData] = useState([]);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axios.get(`http://192.168.3.24:8000/clientinfo-api/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setClientData(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching Client SVS Data:', error);
          });
      }, []);

    return (
        <div className="border border-gray-300  bg-green-50/50" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Client Profile</h2>

                    {/* <p>Kindly provide complete and valid information for the Contact Information section.</p> */}
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
                            <div className="border-1 w-[16.30vw] h-[35.10vh] border-1
                border-green-600 bg-white rounded-md flex flex-col items-center justify-center">
                                <img src={TestJPG} alt="Client Photo" className="w-[9.8vw] h-[17.75vh] object-cover rounded-full" />
                                <div className="mt-4 text-center text-green-800">{clientData.first_name} {clientData.last_name}</div>
                            </div>
                            <div className="border-1 w-full border-1
                border-gray-600/50 bg-white rounded-md flex flex-col border-green-600">
                                <div className="my-2 text-center">Other Details</div>
                                <div className="w-full border-t border-green-600"></div>

                                <div className='flex flex-row justify-around'>
                                    <div className="flex flex-col  space-y-4 pt-4 pb-4">
                                        <div className="flex justify-between space-x-60">
                                            <div>
                                                Preferred Name:
                                            </div>
                                            <div>
                                                {clientData.nickname_preferred_name}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Pronouns:
                                            </div>
                                            <div>
                                                {clientData.preferred_pronouns}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Date of Birth:
                                            </div>
                                            <div>
                                                {clientData.date_of_birth}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Language:
                                            </div>
                                            <div>
                                                {clientData.comfortable_language}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Primary Phone:
                                            </div>
                                            <div>
                                                {clientData.primary_phone}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Email:
                                            </div>
                                            <div>
                                                {clientData.email_address}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Insurance:
                                            </div>
                                            <div>
                                                {clientData.insurance_primary_carrier_name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-full border-1 border-green-600"></div>
                                    <div className="flex flex-col space-y-4 pt-4 pb-4">
                                        <div className="flex justify-between space-x-60">
                                            <div>
                                                Insurance ID:
                                            </div>
                                            <div>
                                                {clientData.insurance_primary_subscriber_id}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Navigator:
                                            </div>
                                            <div>
                                                Mark
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Current Programs:
                                            </div>
                                            <div>
                                                ECM
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Closed Programs:
                                            </div>
                                            <div>
                                                Healthy Measures, Diabetes
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default ClientDetails;