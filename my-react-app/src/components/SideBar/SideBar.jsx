import LeftBarIcon1 from "../images/leftBarIcon1.svg";
import LeftBarIcon2 from "../images/leftBarIcon2.svg";
import LeftBarIcon3 from "../images/leftBarIcon3.svg";
import LeftBarIcon4 from "../images/leftBarIcon4.svg";
import LeftBarIcon5 from "../images/leftBarIcon5.svg";
import LeftBarIcon6 from "../images/leftBarIcon6.svg";
import LeftBarIcon7 from "../images/leftBarIcon7.svg";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-12 pt-8 pb-24 bg-white shadow-2xl rounded-br-[2rem]">
      <button className="p-1 bg-[#D4EDEC]">
        <img src={LeftBarIcon1} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon2} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon3} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon4} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon5} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon6} className="size-4" alt="icon1" />
      </button>
      <button className="p-1 bg-[#EAECEB]">
        <img src={LeftBarIcon7} className="size-4" alt="icon1" />
      </button>
    </div>
  );
};

export default SideBar;
