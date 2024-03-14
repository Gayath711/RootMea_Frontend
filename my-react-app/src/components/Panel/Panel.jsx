'use client';

import Activities from "../Activities/Activities";
import Appointment from "../Appointment/Appointment";
import Calendar from "../Calendar/Calendar";
import SocialVital from "../SocialVital/SocialVital";


const Panel = () => {
    return (
        <div className="flex flex-col space-y-8 items-center pt-12 w-full">
             <SocialVital />
             <Calendar />
             <Appointment />
             <Activities />
        </div>
    )
}

export default Panel;