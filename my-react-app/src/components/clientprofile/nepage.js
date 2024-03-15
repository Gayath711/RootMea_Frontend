import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function NewPage() {
    const { tableName } = useParams();

    const [tableColumns, setTableColumns] = useState([]);
    const [formData, setFormData] = useState({});
    const [matchingTables, setMatchingTables] = useState([]);

    useEffect(() => {
        fetchTableStructure();
    }, []);

    const fetchTableStructure = async () => {
        console.log(tableName, "htdtdytdf")
        try {
            const response = await axios.get(`http://localhost:8000/get_table_structure/${tableName}`);
            if (response.headers['content-type'].includes('application/json')) {
                setTableColumns(response.data.columns);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error fetching table structure:', error);
        }
    };

    const handleInputChange = async (event, columnName) => {
        // Check if the event contains a file
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                // Convert the file to Base64 string
                const base64String = await convertToBase64(file);
                console.log(base64String)
                setFormData({
                    ...formData,
                    [columnName]: base64String
                });
            } catch (error) {
                console.error('Error converting file to Base64:', error);
            }
        } else {
            // If the event doesn't contain a file, handle as text input
            setFormData({
                ...formData,
                [columnName]: event.target.value
            });
        }
    };
    
    
    
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 string
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`http://localhost:8000/get_table_structure/${tableName}/`, formData);
    
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
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/get_matching_tables/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMatchingTables(data.matching_tables);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


const renderInputField = (column) => {

    console.log(column)
    let label = column.name 
    console.log("test",column.is_nullable)
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
                        className="border border-gray-300 rounded px-4 py-2 w-full"
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
                        className="border border-gray-300 rounded px-4 py-2 w-full"
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
                        className="border border-gray-300 rounded px-4 py-2 w-full"
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
                        className="border border-gray-300 rounded px-4 py-2 w-full"
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
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
            );
        default:
            return (
                <div key={column.name} className="mb-4">
                    <label className="block mb-1">{label}</label>
                    <input
                        type="text" // Defaulting to text input for unknown types
                        value={formData[column.name] || ''}
                        onChange={(event) => handleInputChange(event, column.name)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
            );
    }
};






    return (
        <div className="p-4">
            <hr className="my-6" />
            <h2 className="text-xl font-bold mb-4">Form Name - {tableName} </h2>
            {tableColumns.length > 0 && (
                <form onSubmit={handleSubmitPost}>
                    {tableColumns.map((column) => (
                        renderInputField(column)
                    ))}
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>

                  
                </form>
            )}
        </div>
    );
}

export default NewPage;
