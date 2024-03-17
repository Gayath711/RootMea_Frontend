import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faDownload, faUpload} from '@fortawesome/free-solid-svg-icons';



function CreateTableForm() {
  const [tableName, setTableName] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [matchingTables, setMatchingTables] = useState([]);

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

 const staticurl="http://localhost:3001/"
 
 const handleShare = async (tableName) => {
  try {
      if (navigator.share) {
          const url = `${staticurl}createtableform/${tableName}`;
          await navigator.share({
              title: 'Share Table Form',
              text: 'Check out this table form',
              url: url
          });
          console.log('Shared successfully');
      } else {
          throw new Error('Web Share API is not supported in this browser');
      }
  } catch (error) {
      console.error('Error sharing:', error);
      alert('Sharing failed. Please try again later.');
  }
};


const handledownload = async (tableName) => {
  try {
      const response = await fetch(`http://localhost:8000/download_table_data/${tableName}`);

      console.log(tableName)
      console.log(response)
      
      if (!response.ok) {
          throw new Error('Failed to download table data');
      }
      const blob = await response.blob();

      console.log(blob)

  
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
  <div className="p-4">
    <form>
      <h1 className="text-xl font-bold mb-4 animate-fade-in">Available Forms</h1>
      <ul>
        {matchingTables.map((matchedTableName, index) => (
          <li key={index} className="mb-2 border border-green-900 rounded-lg shadow-md relative">
            <div className="bg-green rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-500 style={{ borderColor: '#2b6cb0' }}">
              <Link to={`/createtableform/${matchedTableName}`} className="block p-4">
                <span className="font-bold">{matchedTableName}</span>
              </Link>
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <Link to={`/BulkUploadComponent/${matchedTableName}`} className="block p-1 flex items-center">
                  <FontAwesomeIcon icon={faUpload} className="w-6 h-6" /> {/* Adjust size as needed */}
                </Link>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleShare(matchedTableName)}
                >
                  <FontAwesomeIcon icon={faShare} className="mr-1" /> Share
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handledownload(matchedTableName)}
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-1" /> Download
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </form>
  </div>
);


}

export default CreateTableForm;
