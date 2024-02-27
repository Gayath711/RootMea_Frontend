import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function ClientProfileLandingPage() {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.3.24:8000/clientinfo-api')
      .then(response => {
        setClientData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client Data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            {/* Add more columns as needed based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {clientData.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>
                {/*<Link to={`/clientprofile/${client.id}`}>{client.first_name}</Link>*/}
                <Link to={`/clientprofilefull/${client.id}`}>{client.first_name}</Link>
              </td>
              <td>{client.last_name}</td>
              {/* Add more cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ClientProfileLandingPage;
