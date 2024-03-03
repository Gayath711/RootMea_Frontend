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
    onLogout(); // Call the onLogout function passed as prop
    localStorage.removeItem('isLoggedIn');
    navigate('/'); 
  };

  return(
    

  // <nav class= "bg-white border-gray-200 dark:bg-gray-900 h-40 w-full shadow flex flex-row items-center justify-between">
  //   <div className='flex flex-row '>
  //     <div class= "flex place-items-center">
  //       <div className='flex flex-row w-[250px] place-items-center justify-between pr-10'>
  //         <img src="./root.png" class="h-[3.5rem] w-[4.3rem] ml-4" alt="Roots Logo" />
  //         <img src="./collapse-button.png" class="h-5 w-5 ml-4" alt="Collapse button" />
  //       </div>
  //         <SearchBar />
  //     </div>
  //     <div class= "flex place-items-center">
  //       <img src="./message.png" class="h-[40px] w-[40px] ml-4" alt="messages" />
  //       <img src="./notification.png" class="h-[40px] w-[40px]  ml-4" alt="notifications" />
  //     </div>
  //   </div>
  // </nav>

  <nav className="bg-white h-[13.88vh] w-full shadow flex items-center justify-between px-4">
  <div className="flex items-center">
    <div className={`flex flex-row w-[250px] place-items-center ${isMinimized?'':'justify-between'} pr-3`}>
      <img src="root.png" className="h-[3.5rem] w-[4.3rem] mr-4" alt="Roots Logo" />
      <button onClick={toggleSidebar}>
        {isMinimized && (<img src="./collapse-button-1.png" className="h-5 w-5" alt="Collapse button" />)}
        {!isMinimized && (<img src="./collapse-button.png" className="h-5 w-5 mr-4" alt="Collapse button" />)}
      </button>
    </div>
    <SearchBar />
  </div>
  <div className="flex items-center">
    <img src="./message.png" className="h-[25px] w-[25px] mr-20" alt="messages" />
    <img src="./notification.png" className="h-[25px] w-[25px] mr-20" alt="notifications" />
    <div className="relative">
        <button type="button" className="flex text-sm " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" 
         data-dropdown-placement="bottom"
         onClick={() => {
          const dropdown = document.getElementById('user-dropdown');
          dropdown.classList.toggle('opacity-0');
          dropdown.classList.toggle('pointer-events-none');
        }}
         >
            <img src="./profile.png" alt="Profile" className="h-[50px] w-[50px] rounded-full"/>
        </button>
        <div className="absolute right-0 z-50 opacity-0 pointer-events-none mt-2 py-2 text-base 
        list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 
        dark:divide-gray-600" id="user-dropdown" >
            <div className="px-4 py-3">
                {/* <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span> */}
                <span className="block text-sm ">user@roots.com</span>
            </div>
            <ul aria-labelledby="user-menu-button">
                
                <li>
                    <a href="#" className="block px-4 py-2 text-sm ">Profile</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm " onClick={logout}>Sign out</a>
                </li>
            </ul>
        </div>
    </div>
  </div>
</nav>


  );
}

  export default Navbar;


//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '40px', boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>

//       <div className="container-fluid">
//         <a className="navbar-brand" href="/"><img src="./root.png" alt="Profile" className="profile-img" style={{ width: '50px', height: '50px' }} /></a>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
        
//         <div className="collapse navbar-collapse" id="navbarNav">
          
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/clientprofile">Client Profile</a>
//             </li>
//           </ul>

//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//             <Link to="/clientprofile/2" className="nav-link">Client Profile 2 </Link>
//             </li>
//           </ul>

//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/Home">Organization Dashboard </a>
//             </li>
//           </ul>
          
//           {/*
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/clientprofilefull">Client Profilefull</a>
//             </li>
//           </ul>
// */}
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/encounter_note">Encounter Notes</a>
//             </li>
//           </ul>

//  {/*}         <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/clientprofile">Export Items</a>
//             </li>
//           </ul>
// */}
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="/clientchart">Client Chart</a>
//             </li>
//           </ul>

//           <form className="form-inline my-2 my-lg-0 mx-auto"> {/* Changed mr-auto to mx-auto */}
//             <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        
//           </form>

//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded={dropdownOpen} onClick={handleDropdownToggle}>
//                 <img src="./test.jpg" alt="Profile" className="profile-img" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//               </a>
//               <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdown">
//                 <a className="dropdown-item" href="/UserProfile"><i className="fas fa-sliders-h fa-fw"></i> Account</a>
//                 <a className="dropdown-item" href="#"><i className="fas fa-cog fa-fw"></i> Settings</a>
//                 <div className="dropdown-divider"></div>
//                 <a className="dropdown-item" href="#" onClick={logout}><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
//               </div>
//             </li>
//           </ul>

        
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;