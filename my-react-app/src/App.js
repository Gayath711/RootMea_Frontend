import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Home from './components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientProfileLandingPage from './components/ClientProfileLandingPage';
import ClientProfile from './components/clientprofile'; // Import ClientProfile component
import LoginForm from './components/Logins';
import SignupPage from './components/Signup';
import PasswordReset from './components/ForgotPasswordForm';
import UserProfile from './components/UserProfile';
import ClientChart from './components/clientchart';
import MedicationTable from './components/medicationTable';
import DiagnosisTable from './components/diagnosisTable';
import EncounterNote from './components/encounternote';
import ClientProfileFull from './components/clientprofilefull';
import Admin from './components/Admin';
import Authorization from './components/Authorization';
import CareForm from './components/CareForm';
import EncounterForm from './components/EncounterForm';
import CreateForm from './components/CreateForm';
import Dashboard from './components/Dashboard';
// import { PERMISSIONS } from './components/permissions';
import './tailwind.css'

import CreateTableComponent from './components/clientprofile/createtable';
import CreateTableForm from './components/clientprofile/createtableform'
import AlterTable from './components/clientprofile/altertable'
import NewPage from './components/clientprofile/nepage'
import BulkUploadComponent from './components/clientprofile/BulkUploadComponent'


function App() {
  // Retrieve isLoggedIn state from localStorage on initial render
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };


  const PERMISSIONS = {
    CAN_VIEW_ADMIN: "admin",
    CAN_CREATE_FORM: "create_form",
    CAN_VIEW_CARE_FORM: "view_care_form",
    CAN_VIEW_ENCOUNTER_FORM: "view_encounter_form",
  };


  const [user, setUser] = useState({
    username: "admin",
    permissions: localStorage.getItem("permissions").split(","),
    // permissions: ["admin"],
  });
  console.log("user", user);

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Navbar onLogout={() => setIsLoggedIn(false)} isMinimized={isMinimized} toggleSidebar={toggleSidebar} />
            <div className='flex min-h-screen'>
              {/* <Sidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} /> */}
              <div className='flex-1'>
                <Routes>
                  <Route path="/" element={<ClientProfileLandingPage />} />
                  {/* <Route path="/clientprofile" element={<ClientProfileLandingPage />} /> */}
                  <Route path="/clientprofile/" element={<ClientProfile />} />
                  <Route path="/clientprofile/:clientId" element={<ClientProfile />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/clientchart" element={<ClientChart />} />
                  <Route path="/clientchart/:clientId" element={<ClientChart />} />
                  <Route path="/medication-details/:clientId" element={<MedicationTable />} />
                  <Route path="/diagnosis_details/:clientId" element={<DiagnosisTable />} />
                  <Route path="/UserProfile" element={<UserProfile onLogout={() => setIsLoggedIn(false)} />} />
                  <Route path="/encounter_note" element={<EncounterNote />} />
                  <Route path="/clientprofilefull" element={<ClientProfileFull />} />
                  <Route path="/clientprofilefull/:clientId" element={<ClientProfileFull />} />

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route element={<Authorization user={user} permissions={[PERMISSIONS.CAN_VIEW_ADMIN]} />}>
                    <Route path="/admin-dashboard" element={<Admin user={user} setUser={setUser} />} />
                  </Route>;

                  <Route element={<Authorization user={user} permissions={[PERMISSIONS.CAN_CREATE_FORM]} />}>
                    <Route path="/create-form" element={<CreateForm />} />
                  </Route>;

                  <Route element={<Authorization user={user} permissions={[PERMISSIONS.CAN_VIEW_CARE_FORM]} />}>
                    <Route path="/care-form" element={<CareForm />} />
                  </Route>;

                  <Route element={<Authorization user={user} permissions={[PERMISSIONS.CAN_VIEW_ENCOUNTER_FORM]} />}>
                    <Route path="/encounter-form" element={<EncounterForm />} />
                  </Route>;


                  <Route path="/create_table" element={<CreateTableComponent />} />
                  <Route path='/createtableform' element={<CreateTableForm />} />
                  <Route path="/createtableform/:tableName" element={<NewPage />} />
                  <Route path='/alterTable' element={< AlterTable />} />
                  <Route path='/BulkUploadComponent/:tableName' element={< BulkUploadComponent />} />

                </Routes>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
