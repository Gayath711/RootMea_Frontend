import GreetingImage from "../images/greetingImg.svg";
import DownArrowIcon from "../images/downArrow.svg";
import "./GreetingCardStyles.css";

const GreetingCard = () => {
  return (
    <div id="greeting-card-one" className="flex justify-between items-center shadow-lg p-6 bg-gradient-to-r from-[#D9F0EF] to-[#5BC4BF] rounded-md col-span-5">
      <div id="greeting-card-two">
        <div id="greeting-card-three" className="text-lg leading-7 tracking-normal font-medium">
          Welcome
        </div>
        <div id="greeting-card-four" className="text-sm my-4 font-light sm:w-[80%]">
          Get a snapshot of Roots member's overall picture of health and wellness
        </div>
        <button id="greeting-card-five" className="flex justify-center items-center space-x-2 mt-8 px-4 py-2.5 bg-white rounded-sm">
          <span id="greeting-card-six" className="text-[#2F9384] text-sm">Select Staff</span>
          <img id="greeting-card-seven" src={DownArrowIcon} className="size-4" alt="arrow" />
        </button>
      </div>
      <div id="greeting-card-eight">
        <img id="greeting-card-nine" src={GreetingImage} className="size-44" alt="greeting" />
      </div>
    </div>
  );
};

export default GreetingCard;
