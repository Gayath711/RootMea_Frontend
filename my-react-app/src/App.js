import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Home from './components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'; // Import Routes
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

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Navbar onLogout={() => setIsLoggedIn(false)} />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-1">
                  <Sidebar />
                </div>
                <div className="col-md-11">
                  <Routes>
                    <Route path="/" element={<ClientProfileLandingPage />} />
                    <Route path="/clientprofile" element={<ClientProfileLandingPage />} />
                    <Route path="/clientprofile/:clientId" element={<ClientProfile />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/clientchart" element={<ClientChart />} />
                    <Route path="/clientchart/:clientId" element={<ClientChart />} />
                    <Route path="/medication-details/:clientId" element={<MedicationTable />} />
                    <Route path="/diagnosis_details/:clientId" element={<DiagnosisTable />} />
                    <Route path="/UserProfile" element={<UserProfile onLogout={() => setIsLoggedIn(false)} />} />
                    <Route path="/encounter_note" element={<EncounterNote />} />
                    <Route path="/clientprofilefull" element={<ClientProfileFull />} />
                    <Route path="/clientprofilefull/:clientId" element={<ClientProfileFull/>} />
                  </Routes>
                  <Footer />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
