import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Sidebar.css';


import Sidebar from './clientprofile/SideBar';
import GeneralInformation from './clientprofile/General_Information';
import ContactInformation from './clientprofile/ContactInformation';
import Demographics from './clientprofile/Demographics';
import AddressInformation from './clientprofile/Address';
import CustomFields from './clientprofile/CustomFields';
import PreferredPharmacy from './clientprofile/PreferredPharmacy';
import InsuranceInformation from './clientprofile/InsuranceInformation';
import SystemInformation from './clientprofile/SystemInformation';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmergencyContact1 from './clientprofile/EmergencyContact1';
import EmergencyContact2 from './clientprofile/EmergencyContact2';

const ClientProfile = () => {

  const { clientId } = useParams();

  const token = localStorage.getItem('access_token');

  const [clientData, setSetClientData] = useState('');

  useEffect(() => {
    console.log(clientId,"clientId")
    axios.get(`http://192.168.3.24:8000/clientinfo-api/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSetClientData(response.data);
      console.log(response.data.first_name)
    })
    .catch(error => {
      console.error('Error fetching Client Data:', error);
    });
  }, []);

  return (
    <div className="w-full h-full p-4 bg-gray-50">
      <div class="bg-white p-4 shadow">
        <h2 className="text-2xl font-semibold">Client Profile</h2>
        <div className='flex justify-between'>
          <p className="mt-2 text-lg">Personalised client hub for managing and updating essential information securely</p>
          <div className='flex space-x-6'>
            <p className='text-green-600 font-medium'>Client Chart</p>
            <p className='text-green-600 font-medium'>AMD Profile</p>
            <p className='text-green-600 font-medium'>Manage Program</p>
          </div>
        </div>
        <div class="border-b border-gray-400 mt-4 mb-4"></div>
        <div className='flex'>
          <Sidebar />

          <div class="w-full p-4 space-y-6">
            <div>
              <GeneralInformation clientData= {clientData} />
            </div>
            <div>
              <ContactInformation clientData= {clientData}/>
            </div>
            <div>
              <EmergencyContact1 clientData= {clientData} heading={"Emergency Contact #1 Information"}/>
            </div>
            <div>
              <EmergencyContact2 clientData= {clientData}heading={"Emergency Contact #2 Information"}/>
            </div>
            <div>
              <Demographics clientData= {clientData}/>
            </div>
            <div>
              <AddressInformation clientData= {clientData} />
            </div>
            <div>
              <CustomFields clientData= {clientData} />
            </div>
            <div>
              <PreferredPharmacy clientData= {clientData} />
            </div>
            <div>
              <InsuranceInformation clientData= {clientData} />
            </div>
            <div>
              <SystemInformation clientData= {clientData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;