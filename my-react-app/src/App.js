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
import './tailwind.css'

import CreateTableComponent from './components/dynamicform/createtable';
import CreateTableForm from './components/dynamicform/createtableform'
import AlterTable from './components/dynamicform/altertable'
import NewPage from './components/dynamicform/nepage'
import BulkUploadComponent from './components/dynamicform/BulkUploadComponent'
import RectangleComponent from './components/dynamicform/create'

function App() {
 
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

                  <Route path="/create_table" element={<CreateTableComponent />} />
                  <Route path='/createtableform' element={<CreateTableForm />} />
                  <Route path="/createtableform/:tableName" element={<NewPage />} />
                  <Route path='/alterTable'  element={< AlterTable />} />
                  <Route path='/BulkUploadComponent/:tableName'  element={< BulkUploadComponent />} />
                  <Route path='/RectangleComponent'  element={< RectangleComponent />} />

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
