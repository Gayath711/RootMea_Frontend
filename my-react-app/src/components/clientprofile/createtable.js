import React, { useState } from 'react';
import axios from 'axios'; // Assuming you have Axios installed
import AlterTable from "./altertable"
import { Link } from 'react-router-dom'; // Import Link
import {useNavigate} from 'react-router-dom';

function CreateTableComponent() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '', notNull: false }]);
  const [showPreview, setShowPreview] = useState(false);
  const columnTypes = ['INTEGER', 'VARCHAR(250)', 'TIMESTAMP', 'BOOLEAN','BYTEA']; 
  const showcolumnType = ['Number', 'Text', 'Date', 'BOOLEAN','file']; 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/create_table_endpoint/', {
        table_name: "Roots"+tableName,
        columns: columns,
      });
      console.log(response.data);
      navigate('/createtableform');
    } catch (error) {
      console.error('Error:', error.response.data.message);
      window.alert('An error occurred. Please try again later.');
    }
  };

  const handleColumnNameChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].name = value;
    setColumns(newColumns);
  };

  const handleColumnTypeChange = (index, value) => {
    const newColumns = [...columns];
    const databaseType = columnTypes[showcolumnType.indexOf(value)];
    newColumns[index].type = databaseType;
    setColumns(newColumns);
  };

  const handleNotNullChange = (index) => {
    const newColumns = [...columns];
    newColumns[index].notNull = !newColumns[index].notNull;
    setColumns(newColumns);
  };

  const addColumn = () => {
    setColumns([...columns, { name: '', type: '', notNull: false }]);
  };

  const removeColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview); 
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={togglePreview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Toggle Preview
      </button>

      <div className="flex justify-end mb-4">
        <Link to="/createtableform" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
          Available Forms list
        </Link>
        <Link to="/alterTable" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          Alter Available Forms
        </Link>
      </div>
      
      {showPreview && (
        <form className="mb-4">
          <div className="mb-4">
            <label className="block mb-2">Form Name:</label>
            <span>{tableName}</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Columns:</label>
            {columns.map((column, index) => (
              <div key={index} className="flex flex-wrap">
                <span className="mr-4">field Name: {column.name}</span>
                <span>field Type: {column.type}</span>
              </div>
            ))}
          </div>
        </form>
      )}

      <form onSubmit={handleSubmit} className={showPreview ? 'hidden' : 'block'}>
        <div className="mb-4">
          <label className="block mb-2 animate-fadeIn" style={{ fontWeight: 'bold'}}>Form Name</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-50 focus:outline-none focus:border-green-500 transition-colors duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Field Name:</label>
          {columns.map((column, index) => (
            <div key={index} className="flex flex-wrap mb-2 transition-colors duration-300 hover:bg-gray-100">
              <input
                type="text"
                placeholder="Field Name"
                value={column.name}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-green-500"
              />
              <select
                value={showcolumnType[columnTypes.indexOf(column.type)]}
                onChange={(e) => handleColumnTypeChange(index, e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
              >
                <option value="">Select Type</option>
                {showcolumnType.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
              <input
                  type="checkbox"
                  checked={column.notNull}
                  onChange={() => handleNotNullChange(index)}
                  className="ml-2"
                />
                <label className="ml-1">Required</label>
              <button type="button" onClick={() => removeColumn(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500">
                Remove Field
              </button>
            </div>
          ))}
          <button type="button" onClick={addColumn} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
            Add Field
          </button>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Form
        </button>
      </form>
    </div>
  );
}

export default CreateTableComponent;
