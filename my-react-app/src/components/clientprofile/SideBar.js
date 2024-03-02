import React, { useRef, useState, useEffect } from 'react';

const Sidebar = ({ handleClick }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [sidebarWidth, setSidebarWidth] = useState('38.22vh');

    const handleResize = (e) => {
        setShowSidebar(!showSidebar);
        if (showSidebar) {
            setSidebarWidth(0);
        } else {
            setSidebarWidth('38.22vh');
        }
    };

    return (
        <div className='flex flex-row justify-center items-center'>
            <div className="flex h-full shadow-lg" style={{ width: sidebarWidth }}>
                <div className="bg-white">
                    <div className="py-4 px-6">
                        {showSidebar && (
                            <ul className="mt-6 text-md">
                                <button onClick={() => handleClick(1)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./general-information.png" className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                                        <p className='text-green-800'>General Information</p>
                                    </li>
                                </button>
                                <button onClick={() => handleClick(2)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./contact-information.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        Contact Information
                                    </li>
                                </button>
                                <button onClick={() => handleClick(3)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./demographics.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                        Demographics
                                    </li>
                                </button>
                                <button onClick={() => handleClick(4)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./address.png" className="h-[25px] w-[25px]" alt="client-profile" />
                                        <p className='text-green-800'>Address/Usual Location</p>
                                    </li>
                                </button>
                                <button onClick={() => handleClick(5)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./custom-fields.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        Custom Fields
                                    </li>
                                </button>
                                <button onClick={() => handleClick(6)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./pharmacy.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                        Preferred Pharmacy
                                    </li>
                                </button>
                                <button onClick={() => handleClick(7)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./insurance.png" className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                                        Insurance Information
                                    </li>
                                </button>
                                <button onClick={() => handleClick(8)}>
                                    <li className=" flex items-center mt-10">
                                        <img src="./system-information.png" className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        System Information
                                    </li>
                                </button>
                                <li className=" flex items-center mt-10">
                                    <img src="./export.png" className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                    Export
                                </li>
                            </ul>)
                        }
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-center items-center handle w-5 hover:cursor-ew-resize bg-white" onClick={handleResize}> */}
            <div className='w-5 hover:cursor-ew-resize justify-center items-center -ml-3' onClick={handleResize}>
                <img src="./resize-sidebar.png" className="h-[30px] w-[30px]" alt="resize-sidebar" />
            </div>
        </div>
    );
}

export default Sidebar;