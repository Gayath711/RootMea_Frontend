import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import EditPNG from './images/edit.png';
import SavePNG from './images/save.png';
import EditGreenPNG from './images/edit-green.png';
import SaveGreenPNG from './images/save-green.png';
// import DynamicFieldForm from './clientprofile/dynamicfield'

import MyComponent from './clientprofilefull';
import apiURL from '.././apiConfig';


const ClientProfile = () => {
  const { clientId } = useParams();

  const [isEdittable, setIsEdittable] = useState(true)

  const token = localStorage.getItem('access_token');

  const [clientData, setClientData] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(clientId, "clientId")
    axios.get(`${apiURL}/clientinfo-api/${clientId}`, {
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
  const handleSave = () => {
    setIsHovered(false)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Perform API request to update client data
    axios.put(`${apiURL}/clientinfo-api/${clientId}`, clientData, {
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
            <h2 className="text-gray-800 text-2xl font-medium">Client: {clientData.first_name} {clientData.last_name}</h2>
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
            <button onClick={handleEdit} disabled={!isEdittable}>
              <div className='flex space-x-2 items-center'>
                <img
                  // src={EditGreenPNG}
                  src={isEdittable ? EditGreenPNG : EditPNG}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={() => setIsHovered(false)}
                  class={`w-6 h-6 ${isEdittable ? '' : 'cursor-not-allowed'}`} />
                <div className={isEdittable ? "text-green-800 text-base font-medium" : "text-gray-800 text-base font-medium cursor-not-allowed"}>Edit</div>
              </div>
            </button>
            <button onClick={handleSave} disabled={isEdittable}>
              <div className='flex space-x-2 items-center'>
                <img
                  // src={SaveGreenPNG}
                  src={!isEdittable ? SaveGreenPNG : SavePNG}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={() => setIsHovered(false)}
                  class={`w-5 h-6 ${!isEdittable ? '' : 'cursor-not-allowed'}`} />
                <div className={!isEdittable ? "text-green-800 text-base font-medium" : "text-gray-800 text-base font-medium cursor-not-allowed"}>Save</div>
              </div>
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

            {/* <div>
              <MyComponent id={9} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div> */}

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