import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Sidebar.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUserCircle, faChartBar, faMapMarker, faPen, faPrescriptionBottle, faFileShield, faCog, faDownload } from '@fortawesome/free-solid-svg-icons';
import image from '../test.jpg';

function ClientProfileFull() {



  return (
    <div className="container-fluid">
      <div className="row">
   
        <div className="col-md-12">
          <div className="p-3" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <div className="p-3">
              <GeneralForm />
              <ContactForm  />
              <DemographicsForm  />
              <AddressForm  />
              <CustomFieldsForm  />
              <PreferredPharmacyForm  />
              <InsuranceInformationForm />
              <SystemInformationForm  />
              <ExportInformationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralForm() {
  return (
    <div className="container">
      <hr />
      <div className="row">
        <div className="col-md-4">
          <h3>My Profile</h3>
          <form className="file-upload">
            <div className="bg-secondary-soft px-4 py-5 rounded text-center">
              <div className="row g-3">
                <div className="col">
                  <img src={image} alt="..." className="img-fluid" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <div className="bg-secondary-soft px-4 py-5 rounded">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Client Status *</label>
                <input type="text" className="form-control" placeholder="" aria-label="First name" value={'Pending'} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Client Status Date *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Last name" value={'22/12/2023'} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Client Programs *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value={''} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Client Navigator Name *</label>
                <input type="email" className="form-control" id="inputEmail4" value="Scaralet D" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Client System ID *</label>
                <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="12345" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 d-flex justify-content-center">

      </div>
    </div>
  );
}

function ContactForm() {
  return (

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
   
  );
}

function DemographicsForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Demographics</h3>
      
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


    </div>
  );
}

function AddressForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Address/Usual Location</h3>
      
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

    </div>
  );
}

function CustomFieldsForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Custom Fields</h3>
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
    </div>
  );
}

function PreferredPharmacyForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Preferred Pharmacy</h3>
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
    </div>
  );
}

function InsuranceInformationForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Insurance Information</h3>
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
    </div>
  );
}

function SystemInformationForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>System Information</h3>
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
    </div>
  );
}

function ExportInformationForm() {
  return (
    <div className="bg-secondary-soft px-4 py-5 rounded">
      <h3>Export</h3>
      {/* Your export form JSX */}
    </div>
  );
}

export default ClientProfileFull;
