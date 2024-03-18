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

    axios.post('http://192.168.3.24:8000/upload_csv_to_table/', formData)
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
      const response = await fetch(`http://192.168.3.24:8000/download_table_column_data/${tableName}/`);
  
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
  const cleanedTableName = tableName.replace("roots", "")
  const cleanedTableName1 = cleanedTableName.charAt(0).toUpperCase() + cleanedTableName.slice(1)

  return (
<div className="min-h-screen flex flex-col justify-between bg-gray-100">
  {/* Header */}
  <header className="bg-94cfcf text-white py-4">
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-semibold">CSV Bulk Upload</h1>
    </div>
  </header>

  {/* Main Content */}
  <main className="flex-grow bg-f6f6f6">
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">

      {/* cleanedTableName = matchedTableName.replace("roots", ""); */}
      <h2 className="text-3xl font-semibold mb-6 text-center" style={{ color: "#5ac2be" }}>Bulk Upload CSV for {cleanedTableName1}</h2>
        <div className="mb-6">
          <label htmlFor="file" className="block mb-2 text-lg text-gray-700 font-semibold">Select CSV File:</label>
          <div className="relative border border-gray-300 rounded-lg px-4 py-2 w-full flex items-center justify-between focus-within:border-blue-500">
            <input 
              type="file" 
              id="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              accept=".csv"
            />
            <span className="text-gray-600 mr-2">Upload your file</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <button onClick={handleUpload} className="bg-Teal-500 hover:bg-Teal-700 text-block font-bold py-2 px-4 rounded mb-4 mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-Teal-500" style={{ borderRadius: '3px', background: '#9CDADA' }} >Upload</button>
        </div>
        <div className="flex justify-center">
          <button onClick={handleformdownload} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Download Form Structure</button>
        </div>
        {message && <div className="mt-6 text-lg text-red-500">{message}</div>}
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-94cfcf text-white py-4 text-center">
    <div className="container mx-auto">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </footer>
</div>


  );
  
  
}

export default BulkUploadComponent;



