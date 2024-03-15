import Logo from "../images/logo.svg";
import MenuIcon from "../images/menuIcon.svg";
import GroupIcon from "../images/groupIcon.svg";
import GroupIcon2 from "../images/groupIcon2.svg";
import SettingIcon from "../images/settingIcon.svg";
import ProfileIcon from "../images/profileIcon.svg";

const NavBar = () => {
  return (
    <nav id="navBar" className="px-4 shadow-lg bg-white z-20">
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          <img src={Logo} className="size-24 py-2" alt="logo" />
          <button className="mx-4">
            <img src={MenuIcon} className="size-5" alt="menu" />
          </button>
          <div className="flex items-center mx-2 bg-[#F5F5F5] p-3 py-2 space-x-3">
            <img src={GroupIcon} className="size-5" alt="search" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#F5F5F5] text-sm text-[#1F4B51] p-1 font-medium w-44"
            />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-12 mx-5">
            <button className="p-1 bg-[#EAECEB]">
                <img src={GroupIcon2} className="size-4" alt="no-idea" />
            </button>
            <button className="p-1 bg-[#EAECEB]">
                <img src={SettingIcon} className="size-4" alt="settings" />
            </button>
            <button className="p-1 bg-[#EAECEB]">
                <img src={ProfileIcon} className="size-4" alt="profile" />
            </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
