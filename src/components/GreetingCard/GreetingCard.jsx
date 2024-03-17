import GreetingImage from "../images/greetingImg.svg";
import DownArrowIcon from "../images/downArrow.svg";

const GreetingCard = () => {
  return (
    <div className="flex justify-between items-center shadow-lg p-6 bg-gradient-to-r from-[#D9F0EF] to-[#5BC4BF] rounded-md w-[60%]">
      <div>
        <div className="text-lg leading-7 tracking-normal font-medium">
          Good Day, Mr john Doe
        </div>
        <div className="text-sm my-4 font-light">
          Welcome to the Roots family! <br />
          We are delighted that you have visited our dashboard.
        </div>
        <button className="flex justify-center items-center space-x-2 mt-8 px-4 py-2.5 bg-white rounded-sm">
          <span className="text-[#2F9384] text-sm">Select Staff</span>
          <img src={DownArrowIcon} className="size-4" alt="arrow" />
        </button>
      </div>
      <div>
        <img src={GreetingImage} className="size-44" alt="greeting" />
      </div>
    </div>
  );
};

export default GreetingCard;
