import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/Sidebar.css';
import { Button } from 'react-bootstrap'; 
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle, faUserCircle, faChartBar, faMapMarker, faPen, faPrescriptionBottle, faFileShield, faCog, faDownload} from '@fortawesome/free-solid-svg-icons'; 


function ClientProfile() {
  const [activeForm, setActiveForm] = useState(null);

  const showForm = (formId) => {
    setActiveForm(formId);
  };




  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3" style={{ boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>
          <div className="d-flex flex-column align-items-start p-3">
            <ul className="nav flex-column nav-tabs">
              <li className="nav-item my-3">
                <a className="nav-link active" onClick={() => showForm('general')}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#474648' }} size="1x" /> General Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link" onClick={() => showForm('contact')}>
                  <FontAwesomeIcon icon={faUserCircle} style={{ color: '#474648' }} size="1x" /> Contact Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link" onClick={() => showForm('demographics')}>
                  <FontAwesomeIcon icon={faChartBar} style={{ color: '#474648' }} size="1x" /> Demographics
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('address')}>
                  <FontAwesomeIcon icon={faMapMarker} style={{ color: '#474648' }} size="1x" /> Address/Usual Location
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('custom')}>
                  <FontAwesomeIcon icon={faPen} style={{ color: '#474648' }} size="1x" /> Custom Fields
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('pharmacy')}>
                  <FontAwesomeIcon icon={faPrescriptionBottle} style={{ color: '#474648' }} size="1x" /> Preferred Pharmacy
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('insurance')}>
                  <FontAwesomeIcon icon={faFileShield} style={{ color: '#474648' }} size="1x" /> Insurance Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('system')}>
                  <FontAwesomeIcon icon={faCog} style={{ color: '#474648' }} size="1x" /> System Information
                </a>
              </li>
              <li className="nav-item my-3">
                <a className="nav-link " onClick={() => showForm('export')}>
                  <FontAwesomeIcon icon={faDownload} style={{ color: '#474648' }} size="1x" /> Export
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          {activeForm && (
            <div className="p-3">
              {activeForm === 'general' && <GeneralForm showForm={showForm} />}
              {activeForm === 'contact' && <ContactForm />}
              {activeForm === 'demographics' && <DemographicsForm />}
              {activeForm === 'address' && <AddressForm />}
              {activeForm === 'custom' && <CustomFieldsForm />}
              {activeForm === 'pharmacy' && <PreferredPharmacyForm />}
              {activeForm === 'insurance' && <InsuranceInformationForm />}
              {activeForm === 'system' && <SystemInformationForm />}
              {activeForm === 'export' && <ExportInformationForm />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





function GeneralForm({ showForm }) {
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
                  <img src="./test.jpg" alt="..." className="img-fluid" />
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
                <label className="form-label">First Name *</label>
                <input type="text" className="form-control" placeholder="" aria-label="First name" value="Scaralet" />
              </div>
              {/* Last name */}
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Doe" />
              </div>
              {/* Mobile number */}
              <div className="col-md-12">
                <label className="form-label">Mobile number *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="+91 9852 8855 252" />
              </div>
              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email *</label>
                <input type="email" className="form-control" id="inputEmail4" value="example@homerealty.com" />
              </div>
              {/* Skype */}
              <div className="col-md-6">
                <label className="form-label">Skype *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="Scaralet D" />
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





function ContactForm() {
  return (
    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Accordion Item #0</Accordion.Header>
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
