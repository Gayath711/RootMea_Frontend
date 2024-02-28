import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';

function ClientProfileLandingPage() {
  const [clientData, setClientData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Fetch data whenever searchQuery changes

  const fetchData = () => {
    axios.get(`http://192.168.3.24:8000/clientinfo-api?search=${searchQuery}`)
      .then(response => {
        setClientData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client Data:', error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to determine the background color class based on social risk score
  const getRiskColor = (score) => {
    if (score === "low") {
      return "green-bg";
    } else if (score === "medium") {
      return "yellow-bg";
    } else if (score === "high") {
      return "red-bg";
    } else {
      return ""; // Default color or handle edge cases
    }
  };

  return (
    <div className="container">
      <h2>Clients</h2>
      <div className="row justify-content-end mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">DOB</th>
            <th className="text-center">Gender Identity</th>
            <th className="text-center">Social Risk Housing</th>
            <th className="text-center">Mobile Number</th>
            <th className="text-center">Status on this List</th>
            <th className="text-center">Client Profile</th>
            <th className="text-center">Client Chart</th>
            <th className="text-center">Encounter Note</th>
          </tr>
        </thead>
        <tbody>
          {clientData.map(client => (
            <tr key={client.id}>
              <td className="text-center">{client.id}</td>
              <td className="text-center">
                <Link to={`/clientprofilefull/${client.id}`}>{client.first_name}</Link>
              </td>
              <td className="text-center">{client.last_name}</td>
              <td className="text-center">{client.date_of_birth}</td>
              <td className="text-center">{client.sex}</td>
              {/* <td className={`text-center ${getRiskColor(client.social_risk_score)}`}>
                {client.social_risk_score}
              </td> */}

                            <td className={`text-center ${getRiskColor(client.social_risk_score)}`}>
                red
              </td>
              
              <td className="text-center">{client.mobile_number}</td>
              <td className="text-center">Engaged</td>
              <td className="text-center">
                <Link to={`/clientprofilefull/${client.id}`}>
                  <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
                </Link>
              </td>
              <td className="text-center">
                <Link to={`/clientchart/`}>
                  <FontAwesomeIcon icon={faChartLine} style={{ color: 'red' }} />
                </Link>
              </td>
              <td className="text-center">
                <Link to={`/encounter_note/`}>
                  <FontAwesomeIcon icon={faStickyNote} style={{ color: 'black' }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ClientProfileLandingPage;
