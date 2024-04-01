import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Screenshot from '../../image/Screenshot.png'; 
import Screenshot1 from '../../image/Screenshot.png'; 
import Screenshot2 from '../../image/Screenshot.png'; 
import Screenshot3 from '../../image/Screenshot.png'; 
import Screenshot4 from '../../image/Screenshot.png'; 
import { motion } from 'framer-motion';
import apiURL from '../../apiConfig';
import Swal from 'sweetalert2';

function NewPage() {
    const { tableName } = useParams();

    const [tableColumns, setTableColumns] = useState([]);
    const [formData, setFormData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
  
    useEffect(() => {
      fetchTableHeaders();
    }, [tableName]);




    const handleDropdownOptionsFetch = async (enumType) => {
        try {
            const response = await axios.get(`${apiURL}/get_enum_labels/`, {
                params: {
                    enum_type: enumType
                }
            });
            const dropdownOptions = response.data.enum_labels;
           
            console.log('Dropdown options:', dropdownOptions);
        } catch (error) {
            console.error('Error fetching dropdown options:', error);
        }
    };
  
    const fetchTableHeaders = async () => {
      try {
        const cleanedTableName = tableName.replace("roots", "");
        const response = await axios.get(`${apiURL}/insert_header_get/${tableName}/`);
        if (response.data.headers) {
          setTableHeaders(response.data.headers);
          console.log("headr",response.data.headers)
         
        } else {
          console.error('No headers found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching table headers:', error);
      }
    };
  
    // const handleTableNameChange = (e) => {
    //   setTableName(e.target.value);
    // };

    useEffect(() => {
        fetchTableStructure();
    }, []);

    const fetchTableStructure = async () => {
        console.log(tableName, "htdtdytdf");
        try {
            const response = await axios.get(`${apiURL}/get_table_structure/${tableName}`);
            if (response.headers['content-type'].includes('application/json')) {
                console.log("response.data.columns",response.data.columns)
                console.log('response.data',response.data)
                setTableColumns(response.data.columns);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error fetching table structure:', error);
        }
    };





    const handleInputChange = async (event, columnName) => {
      
        const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;

        setFormData(prevState => ({
            ...prevState,
            [columnName]: value
        }));
    };


    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`${apiURL}/get_table_structure/${tableName}/`, formData);
    
            if (response.status === 201) {
                console.log('Data inserted successfully');
                setFormData({});
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data inserted successfully',
                    timer: 2000
                });
            } else {
                console.error('Error:', response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to insert data. Please fill the required field properly.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again later.'
            });
        } // remove error here
    }
    


    const renderInputField = (column) => {
        console.log(column);
        let label = column.column_fullname;
        console.log("test", column.is_nullable);
        if (column.is_nullable === "NO") {
            label += " *";
        }
        
     

    

        switch (column.type) {
            case 'character varying': 
                return (
                    <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                            type="text"
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        />
                    </div>
                );
            case 'integer':
                return (
                    <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                            type="number"
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        />
                    </div>
                );


                case 'text':
                    return (
                        <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <textarea
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                           
                        />
                    </div>
                    );
                case 'double precision': 
                    return (
                        <div key={column.name} className="mb-4">
                            <label className="block mb-1">{label}</label>
                            <input
                                type="number" // Use type "number" for input validation
                                step="any" // Allow floating-point numbers
                                value={formData[column.name] || ''}
                                onChange={(event) => handleInputChange(event, column.name)}
                                className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                            />
                        </div>
                    );
            case 'boolean':
                return (
                    <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <select
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                );
            case 'bytea':
                return (
                    <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        />
                    </div>
                );


    
            
            case 'timestamp without time zone':
                return (
                    <div key={column.name} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                            type="date"
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        />
                    </div>
                );
                default:
                    

                    
                

                   
                    // const dropdownOptions1=[1,2,3]

                    const enumType = `enum_type_${tableName}_${column.name}_enum_type`;
                    const dropdownOptions1 =handleDropdownOptionsFetch(enumType)

                    console.log(dropdownOptions1)

                    return (
                        <div key={column.name} className="mb-4">
                            <label className="block mb-1">{label}</label>
                            <select
                                value={formData[column.name] || ''}
                                onChange={(event) => handleInputChange(event, column.name)}
                                className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                            >
                                <option value="">Select</option>
                                {dropdownOptions1.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    );
        }
    };



    return (
        <div className="container mt-3">



            <div className="card p-4 shadow " style={{ width: '70%', margin:"auto",backgroundColor : "#f6f6f6"}}>

            <div className="card mb-3">
  {/* <img className="card-img-top" style={{ hight: '300px'}} src={Screenshot} alt="Card image cap" /> */}


    <div>
            <ul className="grid grid-cols-1 gap-4">
                {tableHeaders.map((header, index) => (

                   
                    <motion.li
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h1 className="text-xl font-semibold mb-2">{header[2]}</h1>
                        <h3 className="text-base font-medium text-gray-700">{header[3]}</h3>
                    </motion.li>
                ))}
            </ul>
        </div>
</div>
                {/* <h2 className="text-2xl font-bold mb-4">Form Name - {tableName}</h2> */}
                {tableColumns.length > 0 && (
                    <form onSubmit={handleSubmitPost}>
                        {tableColumns.map((column) => (
                            renderInputField(column)
                        ))}
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="bg-Teal-500 hover:bg-Teal-700 text-block font-bold py-2 px-4 rounded mb-4 mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-Teal-500" style={{ borderRadius: '3px', background: '#9CDADA' }} 
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>



        </div>
    );
}

export default NewPage;