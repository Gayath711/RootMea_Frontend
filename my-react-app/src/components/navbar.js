import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import SearchBar from './SearchBar';

const Navbar = ({ onLogout, isMinimized, toggleSidebar }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('access_token'); // Remove access token
    localStorage.removeItem('refresh_token');
    localStorage.setItem('isLoggedIn', false); // Set isLoggedIn to false
    onLogout(); // Call the onLogout function passed as a prop (if needed)
    navigate('/'); // Redirect to the login page
  };

  return(
    <nav className="bg-white h-40 w-full shadow flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className={`flex flex-row w-[250px] place-items-center ${isMinimized?'':'justify-between'} pr-3`}>
          <img src="root.png" className="h-[3.5rem] w-[4.3rem] mr-4" alt="Roots Logo" />
          <button onClick={toggleSidebar}>
            {isMinimized && (<img src="./collapse-button-1.png" className="h-5 w-5" alt="Collapse button" />)}
            {!isMinimized && (<img src="./collapse-button.png" className="h-5 w-5 mr-4" alt="Collapse button" />)}
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <img src="./message.png" className="h-[25px] w-[25px] mr-20" alt="messages" />
        <img src="./notification.png" className="h-[25px] w-[25px] mr-20" alt="notifications" />
        <div className="dropdown">
          <a href="#" role="button" id="navbarDropdown" onClick={handleDropdownToggle}>
            <img src="./profile.png" alt="Profile" className="h-[50px] w-[50px] rounded-full" />
          </a>
          <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/UserProfile"><i className="fas fa-sliders-h fa-fw"></i> Account</a>
            <a className="dropdown-item" href="#"><i className="fas fa-cog fa-fw"></i> Settings</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" onClick={logout}><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
