import React, { useState, useEffect } from "react";
import Footer from "./components/footer";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "./components/NavBar/NavBar";
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
import CalendarMain from "./components/calendar/CalendarMain";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import "./App.css";
import "./tailwind.css";
import ClientProfileInputForm from "./components/DemoPages/ClientProfielInputForm";

import CreateTableComponent from "./components/dynamicform/createtable";
import CreateTableForm from "./components/dynamicform/createtableform";
import AlterTable from "./components/dynamicform/altertable";
import NewPage from "./components/dynamicform/nepage";
import BulkUploadComponent from "./components/dynamicform/BulkUploadComponent";
import { useWindowSize } from "./components/Utils/windowResize";

function App() {
  // Retrieve isLoggedIn state from localStorage on initial render
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedIn") === "true"
  // );

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  const { width } = useWindowSize();
  console.log(width);

  const isLoggedIn = useSelector((state) => {
    console.log(state);
    return state.auth.isLoggedIn;
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

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
    permissions: localStorage.getItem("permissions") ? localStorage.getItem("permissions").split(",") : ["admin"]
    // permissions: ["admin"],
  });
  console.log("user", user);

  return (
    <Router>
      <div className="App w-full">
        {true ? (
          <>
            <Navbar
              // onLogout={() => setIsLoggedIn(false)}
              width={width}
              onLogout={() => dispatch(logout())}
              isMinimized={isMinimized}
              toggleSidebar={toggleSidebar}
            />
            {/* <div className='flex min-h-screen'> */}
            {/* <Sidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} /> */}
            {/* <div className='flex-1'> */}
            <div className="flex justify-between lg:pr-10">
              {width > 640 && (
                <div id="sideBar" className="w-[4%]">
                  <SideBar />
                </div>
              )}
              <div className="sm:w-[94%] py-8 sm:py-10 space-y-7">
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
                  <Route path="/calendar" element={<CalendarMain />} />
                  <Route path="/encounter_note" element={<EncounterNote />} />
                  <Route
                    path="/clientprofilefull"
                    element={<ClientProfileFull />}
                  />
                  <Route
                    path="/clientprofilefull/:clientId"
                    element={<ClientProfileFull />}
                  />
                  <Route
                    path="/clientprofilefull"
                    element={<ClientProfileFull />}
                  />
                  <Route
                    path="/clientprofilefull/:clientId"
                    element={<ClientProfileFull />}
                  />
                  <Route
                    path="/clientprofileform"
                    element={<ClientProfileInputForm />}
                  />

                  <Route
                    path="/create_form"
                    element={<CreateTableComponent />}
                  />
                  <Route
                    path="/createtableform"
                    element={<CreateTableForm />}
                  />
                  <Route
                    path="/createtableform/:tableName"
                    element={<NewPage />}
                  />
                  <Route path="/alterTable" element={<AlterTable />} />
                  <Route
                    path="/BulkUploadComponent/:tableName"
                    element={<BulkUploadComponent />}
                  />
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
