import { useState, useMemo } from 'react';
import { useTable } from 'react-table';

import { MEDICATION_COLUMNS } from '../constants';
import PrimaryButton from '../common/PrimaryButton'
import '../css/mypanel.module.css'

const Medications = (id) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const [data, setData] = useState([{
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Pending"
    },
    {
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Done"

    },
    {
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Pending"

    },
    {
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Done"

    },
    {
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Pending"

    },
    {
        "id": 10, "medication": "Hypertension", "comments": "...",
        "last_updated_by": "John Doe", "last_updated_date": "2022-01-21", "start_date": "2022-01-21", "stop_date": "2022-01-21", "status": "Pending"

    }
    ]);

    const columns = useMemo(() => MEDICATION_COLUMNS, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });


    return (
        <div className="border border-gray-300  bg-green-50/50" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Medications</h2>

                    {/* <p>Kindly provide complete and valid information for the Contact Information section.</p> */}
                </div>
                <div className='flex space-x-20'>
                    <PrimaryButton text="Add New" width={100} height={35} />
                    <svg
                        className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="13.2988" cy="12.5" r="12.5" transform="rotate(-180 13.2988 12.5)" fill="#28293B" />
                        <path d="M5.51785 16.0377C5.51279 16.2498 5.57946 16.4582 5.7087 16.6337C5.83794 16.8093 6.02336 16.9433 6.23901 17.0172C6.45466 17.0911 6.68988 17.1012 6.91204 17.0461C7.1342 16.991 7.33212 16.8734 7.47847 16.7096L13.2806 10.4628L19.0806 16.7096C19.1709 16.8229 19.2854 16.9177 19.4173 16.9882C19.5491 17.0587 19.6953 17.1034 19.8467 17.1194C19.9981 17.1353 20.1514 17.1223 20.2971 17.0811C20.4428 17.0399 20.5777 16.9714 20.6934 16.8798C20.809 16.7883 20.9028 16.6757 20.9691 16.5492C21.0354 16.4226 21.0726 16.2848 21.0785 16.1444C21.0844 16.0039 21.0589 15.8639 21.0033 15.733C20.9478 15.6021 20.8636 15.4832 20.7559 15.3837L14.1215 8.23166C14.0176 8.11934 13.8886 8.02915 13.7432 7.96731C13.5978 7.90547 13.4396 7.87344 13.2795 7.87344C13.1195 7.87344 12.9612 7.90547 12.8159 7.96731C12.6705 8.02915 12.5414 8.11934 12.4375 8.23166L5.79666 15.3837C5.62267 15.5644 5.52401 15.7961 5.51785 16.0377Z" fill="white" />

                    </svg>
                </div>
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
                                                                <img src="./filter.png" className='ml-3 size-4' />
                                                            </div>
                                                        </div>
                                                    </th>

                                                ))}
                                                <th className='text-center' style={{ minWidth: '120px', backgroundColor: 'white', borderBottom: '1px solid #34703C' }}>
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
                                                        if (cell.value === 'Pending') {
                                                            cellClassName += ' text-red-500';
                                                        } else if (cell.value === 'Done') {
                                                            cellClassName += ' text-green-500';
                                                        }
                                                        return (
                                                            <td className={cellClassName} {...cell.getCellProps()} style={{ padding: '15px 20px', backgroundColor: 'white', borderTop: '1px solid #E1FBE8' }}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        );
                                                    })}
                                                    <td className='' style={{ backgroundColor: 'white', borderTop: '1px solid #E1FBE8' }}>
                                                        <div className='flex flex-row'>
                                                            <img src="./edit.png" className="w-[1.88vw] h-[2.47vh]" style={{ display: 'block', margin: '0 auto' }} />
                                                            <img src="./view.png" className="w-[1.88vw] h-[2.47vh]" style={{ display: 'block', margin: '0 auto' }} />
                                                        </div>
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

export default Medications;