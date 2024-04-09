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

import MyComponent from '../clientprofilefull';
import apiURL from '../../apiConfig';

const initialValues = {
  first_name: null,
  middle_name: null,
  last_name: null,
  nickname_preferred_name: null,
  preferred_pronouns: null,
  email_address: null,
  mobile_number: null,
  home_phone: null,
  work_phone: null,
  best_way_to_contact: null,
  primary_phone: null,
  comfortable_language: null,
  other_language: null,
  date_of_birth: null,
  age: null,
  sex: null,
  social_security_number: null,
  us_armed_forces: null,
  describe_the_place_you_live: null,
  race: null,
  other_race: null,
  ethnicity: null,
  gender_identity: null,
  other_gender_identity: null,
  sexual_orientation: null,
  other_sexual_orientation: null,
  mailing_address_line_1: null,
  mailing_address_line_2: null,
  city: null,
  state: null,
  zip: null,
  usual_location: null,
  preferred_pharmacy_name: null,
  preferred_pharmacy_location: null,
  preferred_pharmacy_phone: null,
  insurance_primary_carrier_name: null,
  insurance_primary_subscriber_id: null,
  insurance_primary_subscriber_name: null,
  insurance_primary_group_name: null,
  insurance_primary_group_id: null,
  insurance_primary_relation_to_insured: null,
  insurance_primary_effective_from: null,
  insurance_primary_effective_to: null,
  insurance_secondary_carrier_name: null,
  insurance_secondary_subscriber_id: null,
  insurance_secondary_subscriber_name: null,
  insurance_secondary_group_name: null,
  insurance_secondary_group_id: null,
  insurance_secondary_relation_to_insured: null,
  insurance_secondary_effective_from: null,
  insurance_secondary_effective_to: null,
  insurance_tertiary_carrier_name: null,
  insurance_tertiary_subscriber_id: null,
  insurance_tertiary_subscriber_name: null,
  insurance_tertiary_group_name: null,
  insurance_tertiary_group_id: null,
  insurance_tertiary_relation_to_insured: null,
  insurance_tertiary_effective_from: null,
  insurance_tertiary_effective_to: null,
  emergency_contact_1_name: null,
  emergency_contact_1_email_address: null,
  emergency_contact_1_relationship: null,
  emergency_contact_1_address_line_1: null,
  emergency_contact_1_address_line_2: null,
  emergency_contact_1_city: null,
  emergency_contact_1_state: null,
  emergency_contact_1_zip: null,
  emergency_contact_1_phone: null,
  emergency_contact_2_name: null,
  emergency_contact_2_email_address: null,
  emergency_contact_2_relationship: null,
  emergency_contact_2_address_line_1: null,
  emergency_contact_2_address_line_2: null,
  emergency_contact_2_city: null,
  emergency_contact_2_state: null,
  emergency_contact_2_zip: null,
  emergency_contact_2_phone: null,
  system_information_original_data_source: null,
  system_information_import_notes: null,
  system_information_import_date: null,
  system_information_prn: null,
  system_information_chart_number: null,
  system_information_system_id: null
};


const ClientProfile = () => {
  const { clientId } = useParams();

  const [isEdittable, setIsEdittable] = useState(false)

  const token = localStorage.getItem('access_token');

  const [clientData, setClientData] = useState(initialValues);
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
    if (!clientData.first_name ||
      !clientData.middle_name ||
      !clientData.last_name) {
      alert('Please fill out all mandatory fields and ensure ZIP code is at least 5 characters long and Social Security Number is 9 characters long.');
      return;
    } else if (clientData.zip_address_n_usual_location && clientData.zip_address_n_usual_location.length < 5) {
      alert('Please ensure ZIP code is at least 5 characters long.');
      return;
    } else if (clientData.social_security_number && clientData.social_security_number.length !== 9) {
      alert('Please ensure Social Security Number is 9 characters long.');
      return;
    }
    axios.post(`${apiURL}/clientinfo-api/`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert("Successfully created")
        console.log('Data submitted successfully:', response.data);
        setClientData(initialValues);
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
            {/* <Link to={`/clientchart/${clientId}`}>
              <p className='text-green-700 font-medium'>Client Chart</p>
            </Link> */}
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
            {/* <div>
              <CustomFields id={5} isEdittable={isEdittable} clientData={clientData} handleFieldChange={handleFieldChange} />
            </div> */}
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