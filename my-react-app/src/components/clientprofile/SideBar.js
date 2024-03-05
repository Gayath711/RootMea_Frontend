import React, { useRef, useState, useEffect } from 'react';
import GeneralInformationPNG from '../../image/general-information.png';
import ContactInformationPNG from '../../image/contact-information.png';
import DemographicsPNG from '../../image/demographics.png';
import AddressPNG from '../../image/address.png';
import CustomFieldsPNG from '../../image/address.png';
import PharmacyPNG from '../../image/pharmacy.png';
import InsurancePNG from '../../image/insurance.png';
import SystemInformationPNG from '../../image/system-information.png';
import ExportPNG from '../../image/export.png'
import ResizePNG from '../../image/resize-sidebar.png';

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
            <div className="flex pb-4 shadow-lg" style={{ width: sidebarWidth }}>
                <div className="bg-white">
                    <div className="px-6">
                        {showSidebar && (
                            <ul className="mt-6 text-md">
                                <button onClick={() => handleClick(1)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={GeneralInformationPNG} className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                                        <p className='text-green-800'>General Information</p>
                                    </li>
                                </button>
                                <button onClick={() => handleClick(2)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={ContactInformationPNG} className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        Contact Information
                                    </li>
                                </button>
                                <button onClick={() => handleClick(3)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={DemographicsPNG} className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                        Demographics
                                    </li>
                                </button>
                                <button onClick={() => handleClick(4)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={AddressPNG} className="h-[25px] w-[25px]" alt="client-profile" />
                                        <p className='text-green-800'>Address/Usual Location</p>
                                    </li>
                                </button>
                                <button onClick={() => handleClick(5)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={CustomFieldsPNG} className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        Custom Fields
                                    </li>
                                </button>
                                <button onClick={() => handleClick(6)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={PharmacyPNG} className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                        Preferred Pharmacy
                                    </li>
                                </button>
                                <button onClick={() => handleClick(7)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={InsurancePNG} className="h-[25px] w-[25px] mr-4" alt="client-profile" />
                                        Insurance Information
                                    </li>
                                </button>
                                <button onClick={() => handleClick(8)}>
                                    <li className=" flex items-center mt-10">
                                        <img src={SystemInformationPNG} className="h-[25px] w-[25px] mr-4" alt="client-chart" />
                                        System Information
                                    </li>
                                </button>
                                <li className=" flex items-center mt-10">
                                    <img src={ExportPNG} className="h-[25px] w-[25px] mr-4" alt="encounter-notes" />
                                    Export
                                </li>
                            </ul>)
                        }
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-center items-center handle w-5 hover:cursor-ew-resize bg-white" onClick={handleResize}> */}
            <div className='w-5 hover:cursor-ew-resize justify-center items-center -ml-3' onClick={handleResize}>
                <img src={ResizePNG} className="h-[30px] w-[30px]" alt="resize-sidebar" />
            </div>
        </div>
    );
}

export default Sidebar;