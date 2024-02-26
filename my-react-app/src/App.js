import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Home from './components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientProfile from './components/clientprofile'; // Import ClientProfile component
import LoginForm from './components/Logins';
import SignupPage from './components/Signup';
import PasswordReset from './components/ForgotPasswordForm';
import UserProfile from './components/UserProfile';
import ClientChart from './components/clientchart';
import MedicationTable from './components/medicationTable';
import DiagnosisTable from './components/diagnosisTable';
import EncounterNote from './components/encounternote'

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

  
  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Navbar />

                  
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-1">
                  <Sidebar />
                </div>
                <div className="col-md-11">

                  
            <Routes>
                    <Route path="/clientprofile" element={<ClientProfile />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/clientchart" element={<ClientChart />} />
                    <Route path="/medication-details/:itemId" element={<MedicationTable />} />
                    <Route path="/diagnosis_details" element={<DiagnosisTable />} />
                    <Route path="/UserProfile" element={<UserProfile onLogout={() => setIsLoggedIn(false)} />} />
                    <Route path="/encounter_note" element={<EncounterNote />} />
                  </Routes>
       
                  <Footer />
                </div>
              </div>
            </div>
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

