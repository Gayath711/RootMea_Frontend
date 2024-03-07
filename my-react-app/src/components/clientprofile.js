import React, { useState, useEffect } from 'react';

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
import PrimaryButton from './common/PrimaryButton'
import SecondaryButton from './common/SecondaryButton'
import AlertSuccess from './common/AlertSuccess';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import DynamicFieldForm from './clientprofile/dynamicfield'

import MyComponent from './clientprofilefull'



const ClientProfile = () => {
  const { clientId } = useParams();

  const [isEdittable, setIsEdittable] = useState(true)

  const token = localStorage.getItem('access_token');

  const [clientData, setClientData] = useState('');

  useEffect(() => {
    console.log(clientId, "clientId")
    axios.get(`http://192.168.3.24:8000/clientinfo-api/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setClientData(response.data);
        console.log(response.data.first_name)
      })
      .catch(error => {
        console.error('Error fetching Client Data:', error);
      });
  }, []);

  const handleClick = (accordionId) => {
    console.log("Inside handleClick")
    console.log("accordian id", `accordion-${accordionId}`)
    const accordionElement = document.getElementById(`accordian-${accordionId}`);
    console.log("accordionElement", accordionElement)
    if (accordionElement) {
      console.log("Inside accordionElement")
      accordionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const handleEdit = () => {
    setIsEdittable(false)
  }

  const handleFieldChange = (field, value) => {
    setClientData((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  }
  const handleSave = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Perform API request to update client data
    axios.put(`http://192.168.3.24:8000/clientinfo-api/${clientId}`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Client data updated successfully:', response.data);
        // Optionally, you can set isEditable back to true if needed
        setIsEdittable(true);
        setShowAlert(true);
      })
      .catch(error => {
        console.error('Error updating Client Data:', error);
      });
  };

  return (
    <div className="w-screen h-full bg-gray-50">
      {showAlert && <AlertSuccess message="Saved successfully" handleClose={closeAlert} />}
      <div className="bg-white p-4 shadow">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Client Profile</h2>
          <PrimaryButton text="Edit" width={70} height={35} handleClick={handleEdit} />
        </div>
        <div className='flex justify-between'>
          <p className="mt-2 text-lg">Personalised client hub for managing and updating essential information securely</p>
          <div className='flex space-x-4'>
            <p className='text-green-600 font-medium'>Client Chart</p>
            <p className='text-green-600 font-medium'>AMD Profile</p>
            <p className='text-green-600 font-medium'>Manage Program</p>
          </div>
        </div>
        <div class="border-b border-gray-400 mt-2 mb-4"></div>
        <div className='flex'>
          <div className=''>
            <Sidebar handleClick={handleClick} />
          </div>
          <div class="w-full px-2 space-y-6" >
            <div>
              <GeneralInformation id={1} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <ContactInformation id={2} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <Demographics id={3} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <AddressInformation id={4} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <CustomFields id={5} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <PreferredPharmacy id={6} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <InsuranceInformation id={7} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>
            <div>
              <SystemInformation id={8} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>

            <div>
              <MyComponent id={9} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div>

            <div className='flex justify-center space-x-4'>
              <SecondaryButton text="Cancel" />
              <PrimaryButton text="Save" handleClick={handleSave} isDisabled={isEdittable} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ClientProfile;