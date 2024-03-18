import React, { useState, useEffect } from "react";
import Footer from "./components/footer";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard"; // Import Dashboard component
import ClientProfile from "./components/clientprofile"; // Import ClientProfile component
import LoginForm from "./components/Logins";
import SignupPage from "./components/Signup";
import PasswordReset from "./components/ForgotPasswordForm";
import UserProfile from "./components/UserProfile";
import ClientChart from "./pages/ClientChart/ClientChart";
import MedicationTable from "./components/medicationTable";
import DiagnosisTable from "./components/diagnosisTable";
import EncounterNote from "./components/encounternote";
import ClientProfileFull from "./components/clientprofilefull";
import SideBar from "./components/SideBar/SideBar";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "./store/slices/authSlice";
import "./App.css";
import "./tailwind.css";

function App() {
  // Retrieve isLoggedIn state from localStorage on initial render
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedIn") === "true"
  // );

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  const isLoggedIn = useSelector(state => {
      console.log(state);
    return state.auth.isLoggedIn});
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Router>
      <div className="App w-full">
        {isLoggedIn ? (
          <>
            <Navbar
              // onLogout={() => setIsLoggedIn(false)}
              onLogout={() => dispatch(logout())}
              isMinimized={isMinimized}
              toggleSidebar={toggleSidebar}
            />
            {/* <div className='flex min-h-screen'> */}
            {/* <Sidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} /> */}
            {/* <div className='flex-1'> */}
            <div className="flex justify-between lg:pr-10">
              <div id="sideBar" className="w-[4%]">
                <SideBar />
              </div>
              <div className="w-[94%] py-12 space-y-7">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/clientprofile" element={<Dashboard />} /> */}
                  <Route path="/clientprofile/" element={<ClientProfile />} />
                  <Route
                    path="/clientprofile/:clientId"
                    element={<ClientProfile />}
                  />
                  <Route path="/home" element={<Home />} />
                  <Route path="/clientchart" element={<ClientChart />} />
                  <Route
                    path="/clientchart/:clientId"
                    element={<ClientChart />}
                  />
                  <Route
                    path="/medication-details/:clientId"
                    element={<MedicationTable />}
                  />
                  <Route
                    path="/diagnosis_details/:clientId"
                    element={<DiagnosisTable />}
                  />
                  {/* <Route
                    path="/UserProfile"
                    element={
                      <UserProfile onLogout={() => setIsLoggedIn(false)} />
                    }
                  /> */}
                  <Route path="/encounter_note" element={<EncounterNote />} />
                  <Route
                    path="/clientprofilefull"
                    element={<ClientProfileFull />}
                  />
                  <Route
                    path="/clientprofilefull/:clientId"
                    element={<ClientProfileFull />}
                  />
                  <Route path="/clientprofilefull" element={<ClientProfileFull />} />
                  <Route path="/clientprofilefull/:clientId" element={<ClientProfileFull />} />
                </Routes>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            <Footer />
          </>
        ) : (
          <Routes>
            {/* <Route path="/" element={<LoginForm onLogin={handleLogin} />} /> */}
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;