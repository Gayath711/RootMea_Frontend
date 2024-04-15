import LeftBarIcon1 from "../images/leftBarIcon1.svg";
import LeftBarIcon2 from "../images/leftBarIcon2.svg";
import LeftBarIcon3 from "../images/leftBarIcon3.svg";
import LeftBarIcon4 from "../images/client-profile-active.svg";
import LeftBarIcon5 from "../images/calender-active.svg";
import LeftBarIcon6 from "../images/form-active.svg";
import LeftBarIcon7 from "../images/directory-active.svg";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-12 pt-8 pb-24 bg-white shadow-2xl rounded-br-[2rem] sticky left-0 top-[100px]">
      
    
    <Link to="/">
    <button className="p-1 bg-[#D4EDEC]" id="dashboard-page" title="Home">
      <img src={LeftBarIcon1} className="size-4" alt="icon1" />
    </button>
  </Link>




  <Link to="/calendar"> 
      <button  className="p-1 bg-[#D4EDEC]" id="calendar-page" title="Calendar">
        <img src={LeftBarIcon5} className="size-4" alt="icon5" />
      </button>
      </Link>


      <Link to="/form_builder">

<button className="p-1 bg-[#EAECEB]" id="form-builder-page" title="Form Builder">
      <img src={LeftBarIcon6} className="size-4" alt="icon6" />
    </button>
    </Link>
    

      <Link to="/directory">
      <button className="p-1 bg-[#EAECEB]" id="directory-page" title="Directory">
        <img src={LeftBarIcon7} className="size-4" alt="icon7" />
      </button>

      </Link>

      <Link to="/clientprofilenew">

  
      <button className="p-1 bg-[#EAECEB]" id="client-profile-new" title="Client Profile">
        <img src={LeftBarIcon4} className="size-4" alt="icon4" />
      </button>

      </Link>


      <button className="p-1 bg-[#EAECEB]" title="Another Link">
        <img src={LeftBarIcon2} className="size-4" alt="icon2" />
      </button>


      <button className="p-1 bg-[#EAECEB] " title="Yet Another Link">
        <img src={LeftBarIcon3} className="size-4" alt="icon6" />
      </button>

      {/* <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon8} className="size-4" alt="icon7" />
      </button> */}
    </div>
  );
};

export default SideBar;


