const Sidebar = () => {
    return (
        <div className="flex h-full shadow-lg w-[300px] transition-all ease-in-out duration-2000">
            <div className={`bg-white w-64 `}>
                <div className="py-4 px-6">
                    <ul className="mt-6 text-lg">
                        <li className=" flex items-center mt-10">
                            <img src="./general-information.png" className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                            <p className='text-green-800'>General Information</p>
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./contact-information.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                            Contact Information
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./demographics.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                            Demographics
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./address.png" className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                            <p className='text-green-800'>Address/Usual Location</p>
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./custom-fields.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                            Custom Fields
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./pharmacy.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                            Preferred Pharmacy
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./insurance.png" className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                            Insurance Information
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./system-information.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                            System Information
                        </li>
                        <li className=" flex items-center mt-10">
                            <img src="./export.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                            Export
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;