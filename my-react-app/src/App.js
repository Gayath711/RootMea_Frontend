import React from 'react';
import Footer from './components/footer';
import Home from './components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientProfile from './components/clientprofile'; // Import ClientProfile component

function App() {
  return (
    <Router>
      <div className="App ">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1">
              <Sidebar />
            </div>
            <div className="col-md-11">
              <Routes>
                <Route path="/clientprofile" element={<ClientProfile />} />
                <Route path="/Home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
