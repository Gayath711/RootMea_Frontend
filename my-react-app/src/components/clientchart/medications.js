import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

import { MEDICATION_COLUMNS } from '../constants';
import PrimaryButton from '../common/PrimaryButton'
import '../css/mypanel.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FilterPNG from '../images/filter.png';
import EditPNG from '../images/edit.png';
import ViewPNG from '../images/view.png';
import AddNewButton from '../common/AddNewButton';
import OpenAccordianPNG from '../images/open-accordion.png';
import ClosedAccordianPNG from '../images/closed-accordion.png';

const Medications = (id) => {

    const { clientId } = useParams();
    const token = localStorage.getItem('access_token');

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

    useEffect(() => {
        axios.get(`http://192.168.3.24:8000/clientmedication-api/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching Client Medication Data:', error);
            });
    }, []);

    return (
        <div className="border border-gray-300  bg-green-50/50 rounded-md" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Medications</h2>

                    {/* <p>Kindly provide complete and valid information for the Contact Information section.</p> */}
                </div>
                <div className='flex space-x-20'>
                    {isOpen && <div className=' flex items-center'><AddNewButton /></div>}
                    <div className=' flex items-center'>
                        <img
                            src={isOpen ? OpenAccordianPNG : ClosedAccordianPNG}
                            alt={isOpen ? 'Open accordian' : 'Close accordion'}
                            className="ml-2 w-6 h-6"
                        />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className="py-4 border-t border-gray-300">
                        <div className='flex flex-col px-0 mt-2'>
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
                                                            <div className='flex items-center'>
                                                                <img src={FilterPNG} className='ml-3 size-4' />
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
                                                            <img src={EditPNG} className="w-5 h-5" style={{ display: 'block', margin: '0 auto' }} />
                                                            <img src={ViewPNG} className="w-5 h-5" style={{ display: 'block', margin: '0 auto' }} />
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