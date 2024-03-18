import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BulkUploadComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { tableName } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!tableName || !file) {
      setMessage('Table name and CSV file are required');
      return;
    }

    const formData = new FormData();
    formData.append('table_name', tableName);
    formData.append('csv_file', file);

    axios.post('http://localhost:8000/upload_csv_to_table/', formData)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error occurred during upload');
        console.error(error);
      });
  };

  const handleformdownload = async () => {
    try {
      const response = await fetch(`http://localhost:8000/download_table_column_data/${tableName}/`);
  
      if (!response.ok) {
        throw new Error('Failed to download table data');
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${tableName}.csv`;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading table data:', error);
      alert('Failed to download table data. Please try again later.');
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Bulk Upload CSV for {tableName}</h2>
      <div className="mb-6">
        <label htmlFor="file" className="block mb-2 text-lg text-gray-700">Select CSV File:</label>
        <input 
          type="file" 
          id="file" 
          onChange={handleFileChange} 
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" 
          accept=".csv"
        />
      </div>
      <div className="flex justify-center mb-6">
        <button onClick={handleUpload} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Upload</button>
      </div>
      <div className="flex justify-center">
        <button onClick={handleformdownload} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Download Form Structure</button>
      </div>
      {message && <div className="mt-6 text-lg text-red-500">{message}</div>}
    </div>
  );
  
  
}

export default BulkUploadComponent;
