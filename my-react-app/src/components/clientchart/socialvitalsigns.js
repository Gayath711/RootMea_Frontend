import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

import { SOCIAL_VITAL_COLUMNS } from '../constants';
import '../css/mypanel.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FilterPNG from '../images/filter.png';
import ViewPNG from '../images/view.png';

const SocialVitalSigns = ({id}) => {
    const { clientId } = useParams();
    const token = localStorage.getItem('access_token');

    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const [data, setData] = useState([{
        "id": 10, "domain": "Housing", "risk": "High", "date_last_accessed": "2022-01-16"
    },
    {
        "id": 10, "domain": "Food Access", "risk": "Medium", "date_last_accessed": "2022-01-21"
    },
    {
        "id": 10, "domain": "Financial Security", "risk": "Low", "date_last_accessed": "2022-03-19"
    },
    {
        "id": 10, "domain": "Education/Employment", "risk": "High", "date_last_accessed": "2022-04-23"
    },
    {
        "id": 10, "domain": "Communication and Mobility", "risk": "Medium", "date_last_accessed": "2022-09-21"
    },
    {
        "id": 10, "domain": "Healthcare - Preventiative", "risk": "Medium", "date_last_accessed": "2022-09-21"
    },
    {
        "id": 10, "domain": "Healthcare - General Health", "risk": "Medium", "date_last_accessed": "2022-09-21"
    },
    {
        "id": 10, "domain": "Healthcare - Cardiovascular  risk", "risk": "Low", "date_last_accessed": "2022-10-06"
    }
    ]);

    const columns = useMemo(() => SOCIAL_VITAL_COLUMNS, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    useEffect(() => {
        axios.get(`http://192.168.3.24:8000/clientsvs-api/${clientId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(response => {
            setData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching Client SVS Data:', error);
        });
    }, []);

    return (
        <div className="border border-gray-300  bg-green-50/50" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Social Vital Signs</h2>

                    {/* <p>Kindly provide complete and valid information for the Contact Information section.</p> */}
                </div>
                <svg
                    className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.2988" cy="12.5" r="12.5" transform="rotate(-180 13.2988 12.5)" fill="#28293B" />
                    <path d="M5.51785 16.0377C5.51279 16.2498 5.57946 16.4582 5.7087 16.6337C5.83794 16.8093 6.02336 16.9433 6.23901 17.0172C6.45466 17.0911 6.68988 17.1012 6.91204 17.0461C7.1342 16.991 7.33212 16.8734 7.47847 16.7096L13.2806 10.4628L19.0806 16.7096C19.1709 16.8229 19.2854 16.9177 19.4173 16.9882C19.5491 17.0587 19.6953 17.1034 19.8467 17.1194C19.9981 17.1353 20.1514 17.1223 20.2971 17.0811C20.4428 17.0399 20.5777 16.9714 20.6934 16.8798C20.809 16.7883 20.9028 16.6757 20.9691 16.5492C21.0354 16.4226 21.0726 16.2848 21.0785 16.1444C21.0844 16.0039 21.0589 15.8639 21.0033 15.733C20.9478 15.6021 20.8636 15.4832 20.7559 15.3837L14.1215 8.23166C14.0176 8.11934 13.8886 8.02915 13.7432 7.96731C13.5978 7.90547 13.4396 7.87344 13.2795 7.87344C13.1195 7.87344 12.9612 7.90547 12.8159 7.96731C12.6705 8.02915 12.5414 8.11934 12.4375 8.23166L5.79666 15.3837C5.62267 15.5644 5.52401 15.7961 5.51785 16.0377Z" fill="white" />

                </svg>

            </div>
            {
                isOpen && (
                    <div className="p-4 border-t border-gray-300">

                        <div className='flex flex-col px-3 mt-2'>
                            <div className="rounded-lg p-4" >
                                <table {...getTableProps()} className="">
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()} >
                                                {headerGroup.headers.map((column) => (

                                                    <th className='text-left' {...column.getHeaderProps()} style={{ padding: '20px', minWidth: column.width, backgroundColor: 'white', borderBottom: '1px solid #34703C' }}>
                                                        <div className='flex flex-row'>
                                                            <div>
                                                                {column.render('Header')}
                                                            </div>
                                                            <div>
                                                                <img src={FilterPNG} className='ml-3 size-4' />
                                                            </div>
                                                        </div>
                                                    </th>

                                                ))}
                                                <th  className='text-left' style={{ padding: '20px', backgroundColor: 'white', borderBottom: '1px solid #34703C' }}>
                                                    Date Last Accessed
                                                </th>
                                                <th className='text-center' style={{ minWidth: '130px', backgroundColor: 'white', borderBottom: '1px solid #34703C' }}>
                                                    Action
                                                </th>
                                            </tr>
                                        ))}

                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => {
                                                        let cellClassName = 'text-left';
                                                        if (cell.value === 'High' || cell.value === 'Yes') {
                                                            cellClassName += ' text-red-500';
                                                        } else if (cell.value === 'Medium') {
                                                            cellClassName += ' text-orange-500';
                                                        } else if (cell.value === 'Low' || cell.value === 'No') {
                                                            cellClassName += ' text-green-500';
                                                        }
                                                        return (
                                                            <td className={cellClassName} {...cell.getCellProps()} style={{ padding: '15px 20px', backgroundColor: 'white', borderTop: '1px solid #E1FBE8' }}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        );
                                                    })}
                                                    <td  style={{ padding: '15px 20px', backgroundColor: 'white', borderTop: '1px solid #E1FBE8' }}>2022-10-06</td>
                                                    <td className='' style={{ backgroundColor: 'white', borderTop: '1px solid #E1FBE8' }}>
                                                        <img src={ViewPNG} className="w-[1.88vw] h-[2.47vh]" style={{ display: 'block', margin: '0 auto' }} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div >
                    </div>
                )
            }
        </div >
    );
}

export default SocialVitalSigns;