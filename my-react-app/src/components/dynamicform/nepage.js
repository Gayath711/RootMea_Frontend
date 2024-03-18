import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Screenshot from '../../image/Screenshot.png'; 
import Screenshot1 from '../../image/Screenshot.png'; 
import Screenshot2 from '../../image/Screenshot.png'; 
import Screenshot3 from '../../image/Screenshot.png'; 
import Screenshot4 from '../../image/Screenshot.png'; 

function NewPage() {
    const { tableName } = useParams();

    const [tableColumns, setTableColumns] = useState([]);
    const [formData, setFormData] = useState({});
    const [matchingTables, setMatchingTables] = useState([]);

    useEffect(() => {
        fetchTableStructure();
    }, []);

    const fetchTableStructure = async () => {
        console.log(tableName, "htdtdytdf");
        try {
            const response = await axios.get(`http://192.168.3.24:8000/get_table_structure/${tableName}`);
            if (response.headers['content-type'].includes('application/json')) {
                console.log(response.data.columns)
                console.log(response.data)
                setTableColumns(response.data.columns);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error fetching table structure:', error);
        }
    };

    const handleInputChange = async (event, columnName) => {
        // Extract the value from the event
        const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;

        // Update the formData state using a callback function
        setFormData(prevState => ({
            ...prevState,
            [columnName]: value
        }));
    };

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`http://192.168.3.24:8000/get_table_structure/${tableName}/`, formData);
    
            if (response.status === 201) {
                console.log('Data inserted successfully');
                setFormData({});
                alert('Data inserted successfully');
            } else {
                console.error('Error:', response.data.message);
                alert('Failed to insert data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };



    const renderInputField = (column) => {
        console.log(column);
        let label = column.column_fullname;
        console.log("test", column.is_nullable);
        if (column.is_nullable === "NO") {
            label += " *";
        }

        switch (column.type) {
            case 'character varying': // Adjusted type for VARCHAR
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
                            <option value="true">True</option>
                            <option value="false">False</option>
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
                            type="datetime-local"
                            value={formData[column.name] || ''}
                            onChange={(event) => handleInputChange(event, column.name)}
                            className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                        />
                    </div>
                );
            default:
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
        }
    };



    return (
        <div className="container mt-3">



            <div className="card p-4 shadow " style={{ width: '70%', margin:"auto"}}>

            <div className="card mb-3">
  {/* <img className="card-img-top" style={{ hight: '300px'}} src={Screenshot} alt="Card image cap" /> */}
  
</div>
                <h2 className="text-2xl font-bold mb-4">Form Name - {tableName}</h2>
                {tableColumns.length > 0 && (
                    <form onSubmit={handleSubmitPost}>
                        {tableColumns.map((column) => (
                            renderInputField(column)
                        ))}
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
