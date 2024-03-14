import LineUpTeal from "../images/lineUpTeal.svg"
import LineUpPurple from "../images/lineUpPurple.svg"
import ClientIcon from "../images/clientsIcon.svg"
import ProgramIcon from "../images/programIcon.svg"

const TopStats =() => {
    return (
        <div className="bg-white rounded-md shadow-md w-[38%]">
            <div className="flex justify-around text-lg font-medium my-2 text-center">
                <div>Total Clients</div>
                <div>Total Program</div>
            </div>
            <hr className="w-11/12 mx-auto my-2" />
            <div className="flex justify-around text-lg font-extrabold my-8">
                <div className="flex justify-center items-center p-6 rounded-md bg-[#D9F0EF] text-[#43B09C]"><span>270</span></div>
                <div className="flex justify-center items-center p-6 rounded-md bg-[#E6EAED] text-[#1F4B51]"><span>378</span></div>
            </div>
            <div className="flex justify-around items-center">
                <div className="flex items-center">
                    <img src={LineUpTeal} className="size-4 mx-1" alt="lineup" />
                    <div className="text-xs"><span className="text-[#43B09C]">28%</span> vs Last Year</div>
                    <img src={ClientIcon} className="size-5 mx-2" alt="client" />
                </div>
                <div className="flex items-center">
                    <img src={LineUpPurple} className="size-4 mx-1" alt="lineup" />
                    <div className="text-xs"><span className="text-[#7397B5]">38%</span> vs Last Year</div>
                    <img src={ProgramIcon} className="size-5 mx-2" alt="client" />
                </div>
            </div>
        </div>
    )
}

export default TopStats