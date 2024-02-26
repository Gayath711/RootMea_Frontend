import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/Sidebar.css';
import { Button } from 'react-bootstrap'; 
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle, faUserCircle, faChartBar, faMapMarker, faPen, faPrescriptionBottle, faFileShield, faCog, faDownload} from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from 'react-router-dom';
import image from '../test.jpg';

function ClientProfile() {
  const { clientId } = useParams();

  const [activeForm, setActiveForm] = useState('general');
  const [clientData, setSetClientData] = useState('');

  useEffect(() => {
    console.log(clientId,"clientId")
    axios.get(`http://127.0.0.1:8000/clientinfo-api/${clientId}`)
      .then(response => {
        setSetClientData(response.data);
        console.log(response.data.first_name)
      })
      .catch(error => {
        console.error('Error fetching Client Data:', error);
      });
  }, []);
  const showForm = (formId) => {
    setActiveForm(formId);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3" style={{ boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>
          <div className="d-flex flex-column align-items-start p-3">
            <ul className="nav flex-column nav-pills">
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'general' ? 'active' : ''}`} id={`${activeForm === 'general' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('general')}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#474648' }} size="1x" /> General Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'contact' ? 'active' : ''}`} id={`${activeForm === 'contact' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('contact')}>
                  <FontAwesomeIcon icon={faUserCircle} style={{ color: '#474648' }} size="1x" /> Contact Information
                </a>
              </li>

              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'demographics' ? 'active' : ''}`} id={`${activeForm === 'demographics' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('demographics')}>
                  <FontAwesomeIcon icon={faChartBar} style={{ color: '#474648' }} size="1x" /> Demographics
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'address' ? 'active' : ''}`} id={`${activeForm === 'address' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('address')}>
                  <FontAwesomeIcon icon={faMapMarker} style={{ color: '#474648' }} size="1x" /> Address/Usual Location
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'custom' ? 'active' : ''}`} id={`${activeForm === 'custom' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('custom')}>
                  <FontAwesomeIcon icon={faPen} style={{ color: '#474648' }} size="1x" /> Custom Fields
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'pharmacy' ? 'active' : ''}`} id={`${activeForm === 'pharmacy' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('pharmacy')}>
                  <FontAwesomeIcon icon={faPrescriptionBottle} style={{ color: '#474648' }} size="1x" /> Preferred Pharmacy
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'insurance' ? 'active' : ''}`} id={`${activeForm === 'insurance' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('insurance')}>
                  <FontAwesomeIcon icon={faFileShield} style={{ color: '#474648' }} size="1x" /> Insurance Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'system' ? 'active' : ''}`} id={`${activeForm === 'system' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('system')}>
                  <FontAwesomeIcon icon={faCog} style={{ color: '#474648' }} size="1x" /> System Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className={`nav-link ${activeForm === 'export' ? 'active' : ''}`} id={`${activeForm === 'export' ? 'active-link' : 'in-active-link'}`} onClick={() => showForm('export')}>
                  <FontAwesomeIcon icon={faDownload} style={{ color: '#474648' }} size="1x" /> Export
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          {activeForm && (
            <div className="p-3">
              {activeForm === 'general' && <GeneralForm showForm={showForm} clientData={clientData} />}
              {activeForm === 'contact' && <ContactForm showForm={showForm} clientData={clientData} />}
              {activeForm === 'demographics' && <DemographicsForm clientData={clientData} />}
              {activeForm === 'address' && <AddressForm clientData={clientData} />}
              {activeForm === 'custom' && <CustomFieldsForm clientData={clientData} />}
              {activeForm === 'pharmacy' && <PreferredPharmacyForm clientData={clientData} />}
              {activeForm === 'insurance' && <InsuranceInformationForm clientData={clientData} />}
              {activeForm === 'system' && <SystemInformationForm clientData={clientData} />}
              {activeForm === 'export' && <ExportInformationForm clientData={clientData} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





function GeneralForm({ showForm , clientData}) {

  return (
    <div className="container">
      <hr /> {/* Line across the entire row */}
      <div className="row">
        <div className="col-md-4">
          <h3>My Profile</h3>
          {/* Form START */}
          <form className="file-upload">
            <div className="bg-secondary-soft px-4 py-5 rounded text-center">
              <div className="row g-3">
                <div className="col">
                  <img src={image} alt="..." className="img-fluid" />
                </div>
              </div>
            </div>
          </form> {/* Form END */}
        </div>
        <div className="col-md-8">
          <div className="bg-secondary-soft px-4 py-5 rounded">
            <div className="row g-3">
              {/* First Name */}
              <div className="col-md-6">
                <label className="form-label">Client Status *</label>
                <input type="text" className="form-control" placeholder="" aria-label="First name" value={'Pending'} />
              </div>
              {/* Last name */}
              <div className="col-md-6">
                <label className="form-label">Client Status Date *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Last name" value={'22/12/2023'} />
              </div>
              {/* Mobile number */}
              <div className="col-md-12">
                <label className="form-label">Client Programs *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value={''} />
              </div>
              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Client Navigator Name *</label>
                <input type="email" className="form-control" id="inputEmail4" value="Scaralet D" />
              </div>
              {/* Skype */}
              <div className="col-md-6">
                <label className="form-label">Client System ID *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="12345" />
              </div>
            </div> {/* Row END */}
          </div>
        </div>
      </div> {/* Row END */}
      {/* button */}
      <div className="col-md-12 d-flex justify-content-center">
       
        <Button className="btn btn-success" onClick={() => showForm('contact')}>Next</Button>
      </div>
    </div> 
  );
}





function ContactForm({ showForm , clientData }) {
  console.log(clientData.id,"contact")
  return (
    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Accordion Item #0</Accordion.Header>
      <Accordion.Body>

      <div className="bg-secondary-soft px-4 py-5 rounded">
  <div className="row g-3">
    {/* First Name */}
    <div className="col-md-4">
      <label className="form-label">First Name*</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value={clientData.first_name || ""} />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Middle Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.middle_name || ""}  />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.last_name || ""}  />
    </div>

    <div className="col-md-4">
      <label className="form-label">Nick name/Preferred name*</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value={clientData.last_name || ""} />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Preferred Pronouns*</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.last_name || ""} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Email Address*</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.last_name || ""} />
    </div>

    <div className="col-md-4">
      <label className="form-label">Mobile Number*</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value={clientData.last_name || ""} />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Home Phone Number *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.last_name || ""}/>
    </div>
    <div className="col-md-4">
      <label className="form-label">Work Phone Number *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value={clientData.last_name || ""} />
    </div>

    {/* Email */}
    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Select best way to contact you *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Select primary phone number *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Select Preferred language *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Select other languages *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>
  </div> {/* Row END */}
</div>





            
     

      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Accordion Item #1</Accordion.Header>
      <Accordion.Body>
       

      <div className="bg-secondary-soft px-4 py-5 rounded">
  <div className="row g-3">
    {/* First Name */}
    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    {/* Email */}
    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>
  </div> {/* Row END */}
</div>


      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>Accordion Item #2</Accordion.Header>
      <Accordion.Body>
       
      <div className="bg-secondary-soft px-4 py-5 rounded">
  <div className="row g-3">
    {/* First Name */}
    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    {/* Email */}
    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>
  </div> {/* Row END */}
</div>



      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>Accordion Item #3</Accordion.Header>
      <Accordion.Body>
    

<div className="bg-secondary-soft px-4 py-5 rounded">
  <div className="row g-3">
    {/* First Name */}
    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    <div className="col-md-4">
      <label className="form-label">First Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
    </div>
    {/* Last name */}
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name *</label>
      <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
    </div>

    {/* Email */}
    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactMethod" className="form-label">Contact Method *</label>
      <select className="form-select" id="contactMethod">
        <option value="email">Email</option>
        <option value="skype">Skype</option>
      </select>
    </div>
  </div> {/* Row END */}
</div>
<div className="col-md-12 d-flex justify-content-center">
        <button type="button" className="btn btn-success">Next</button>
      </div>




      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  );
}


function DemographicsForm() {
  return <div>Demographics Form</div>;
}

function AddressForm() {
  return <div>Address/Usual Location Form</div>;
}

function CustomFieldsForm() {
  return <div>Custom Fields Form</div>;
}

function PreferredPharmacyForm() {
  return <div>Preferred Pharmacy Form</div>;
}

function InsuranceInformationForm() {
  return <div>Insurance Information Form</div>;
}

function SystemInformationForm() {
  return <div>System Information Form</div>;
}


function ExportInformationForm() {
  return <div>Export Information Form</div>;
}


export default ClientProfile;
