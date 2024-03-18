import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faDownload, faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Input, Ripple, initMDB } from "mdb-ui-kit";
import deleteImage from '../../image/delete.jpg';
import edit from '../../image/edit.jpg';
import bulk from '../../image/bulk.jpg';
import share from '../../image/share.jpg';
import down from '../../image/down.png';
import file from '../../image/file.jpg';
import file1 from '../../image/file1.png';
import date from '../../image/date.png';

initMDB({ Input, Ripple });

function CreateTableForm() {
  const [tableName, setTableName] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [matchingTables, setMatchingTables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.3.24:8000/get_matching_tables/');
        setMatchingTables(response.data.matching_tables);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTables = matchingTables.filter((tableName) =>
    tableName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const staticurl = "http://localhost:3001/";

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
      const response = await axios.get(`http://192.168.3.24:8000/download_table_data/${tableName}`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${tableName}.csv`);
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
    <div className="container">
      <div className="row">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '200px', backgroundColor: '#f8f9fa', padding: '20px' }}>
          <div className="col text-center">
            <h1 className="display-3" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>All Forms</h1>
            <p className="lead" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>Explore and manage all forms here</p>

            <div className="input-group mb-3 justify-content-center" style={{ width: '50%', margin: 'auto' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search forms..."
                aria-label="Search forms"
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {filteredTables.map((matchedTableName, index) => {
            const cleanedTableName = matchedTableName.replace("roots", "");
            return (
              <div key={index} className="card border-success row col-2" style={{ maxWidth: '18rem', margin: '20px' }}>
                <div className="card-header bg-transparent border-success">
                  <div className='row justify-content-center'>
                    <div className='col-4 text-center'>
                      <a href={`/createtableform/${matchedTableName}`}>
                        <img src={edit} alt="Edit" className="img-fluid" style={{ width: '40px', height: '40px' }} />
                      </a>
                    </div>
                    <div className='col-4 text-center'>
                      <button type="button" onClick={() => handleShare(matchedTableName)}>
                        <img src={share} alt="Share" className="img-fluid" style={{ width: '40px', height: '40px' }} />
                      </button>
                    </div>
                    <div className='col-4 text-center'>
                      <a href={`/BulkUploadComponent/${matchedTableName}`}>
                        <img src={bulk} alt="Bulk" className="img-fluid" style={{ width: '40px', height: '40px' }} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body text-success">
                  <div style={{ textAlign: 'center' }}>
                    <h5 className="card-title">{cleanedTableName.charAt(0).toUpperCase() + cleanedTableName.slice(1)}</h5>

                    
                    <a href={`/createtableform/${matchedTableName}`}>
                      <img src={file1} alt="File1" className="img-fluid" style={{ width: '60px', height: '60px', flexShrink: 0, margin: 'auto' }} />
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-success">
                  <div className='row justify-content-center'>
                    <div className='col-6 text-center'>
                      <img src={date} alt="Date" style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div className='col-6 text-center'>
                      <button type="button" onClick={() => handledownload(matchedTableName)}>
                        <img src={down} alt="Download" style={{ width: '40px', height: '40px' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateTableForm;
