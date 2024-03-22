import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Sidebar.css';


import Sidebar from './SideBar';
import GeneralInformation from './General_Information';
import ContactInformation from './ContactInformation';
import Demographics from './Demographics';
import AddressInformation from './Address';
import CustomFields from './CustomFields';
import PreferredPharmacy from './PreferredPharmacy';
import InsuranceInformation from './InsuranceInformation';
import SystemInformation from './SystemInformation';
import AlertSuccess from '../common/AlertSuccess';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditPNG from '../images/edit.png';
import SavePNG from '../images/save.png';
import EditGreenPNG from '../images/edit-green.png';
import SaveGreenPNG from '../images/save-green.png';
// import DynamicFieldForm from './clientprofile/dynamicfield'

import MyComponent from '../clientprofilefull'



const ClientProfile = () => {
  const { clientId } = useParams();

  const [isEdittable, setIsEdittable] = useState(false)

  const token = localStorage.getItem('access_token');

  const [clientData, setClientData] = useState('');
  const [isHovered, setIsHovered] = useState(false);


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
    setIsHovered(false)
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
 

  const handleSave = (event) => {
    event.preventDefault();
    console.log('Submitting clientData:', clientData);
    if (!clientData.first_name || !clientData.middle_name || !clientData.last_name) {
        alert('Please fill out all mandatory fields.');
        return;
    }
    axios.post(`http://localhost:8000/clientinfo-api/`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
        alert("Successfully created")
        console.log('Data submitted successfully:', response.data);
        setClientData({
            first_name: '',
            middle_name: '',
            last_name: '',
            sex: '',
            date_of_birth: '',
            mobile_number: '',
            home_phone: '',
            work_phone: '',
            email_address: '',
            best_way_to_contact: '',
            primary_phone: '',
            comfortable_language: '',
            other_language: ''
        });
    })
    .catch(error => {
        console.error('Error submitting Client Data:', error);
    });
};
  
  function handleMouseEnter() {
    setTimeout(() => {
      setIsHovered(true);
    }, 100);
  }

  return (
    <div className="h-full bg-gray-50">
      {showAlert && <AlertSuccess message="Saved successfully" handleClose={closeAlert} />}
      <div className="bg-white p-4 shadow">
        <div className="flex justify-between mb-0 mt-4 pl-4">
          <div className='flex space-x-12'>
            {/* {isEdittable && (<button onClick={handleEdit}>
              <div className='flex flex-col items-center'>
                <img
                  // src={EditPNG} 
                  src={isHovered ? EditGreenPNG : EditPNG}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={() => setIsHovered(false)}
                  class="w-6 h-6" />
                {isHovered && <div className="text-green-800 text-base font-medium">Edit</div>}
              </div>
            </button>)}
            {!isEdittable && (<button onClick={handleSave}>
              <div className='flex flex-col items-center'>
                <img
                  // src={SavePNG} 
                  src={isHovered ? SaveGreenPNG : SavePNG}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={() => setIsHovered(false)}
                  class="w-5 h-6" />
                {isHovered && <div className="text-green-800 text-base font-medium">Save</div>}
              </div>
            </button>)} */}
            <button onClick={handleSave} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>
                Save
            </button>
          </div>
          <div className='flex space-x-8'>
            <Link to={'/'}>
              <p className='text-green-700 font-medium'>Dashboard</p>
            </Link>
            <Link to={`/clientchart/${clientId}`}>
              <p className='text-green-700 font-medium'>Client Chart</p>
            </Link>
            <p className='text-green-700 font-medium'>AMD Profile</p>
            <p className='text-green-700 font-medium pr-8'>Manage Program</p>
          </div>
        </div>
        <div class="border-b border-green-800 mt-2 mb-4"></div>
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

            {/* <div className='flex justify-center space-x-4'>
              <SecondaryButton text="Cancel" />
              <PrimaryButton text="Save" handleClick={handleSave} isDisabled={isEdittable} />
            </div> */}
          </div>

        </div>
      </div>
    </div >
  );
}

export default ClientProfile;