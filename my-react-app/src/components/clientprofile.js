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

const ClientProfile = () => {

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
              <GeneralInformation />
            </div>
            <div>
              <ContactInformation />
            </div>
            <div>
              <Demographics />
            </div>
            <div>
              <AddressInformation />
            </div>
            <div>
              <CustomFields />
            </div>
            <div>
              <PreferredPharmacy />
            </div>
            <div>
              <InsuranceInformation />
            </div>
            <div>
              <SystemInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;