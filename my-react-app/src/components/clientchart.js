import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import './css/clientchart.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MedicationTable from './medicationTable'; // Import the new component

function ClientChart() {
  const [client ,setClient] = useState([]);  
  const [clientMedicationData, setClientMedicationData] = useState([]);
  const [clientDiagnosesData, setClientDiagnosesData] = useState([]);
  const [clientSVSData, setClientSVSData] = useState({
    food_data: {},
    home_data: {},
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clientinfo-api/1')
      .then(response => {
        setClient(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client SVS Data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clientsvs-api/1')
      .then(response => {
        setClientSVSData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client SVS Data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clientmedication-api/1')
      .then(response => {
        setClientMedicationData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client Medication Data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clientdiagnoses-api/1')
      .then(response => {
        setClientDiagnosesData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching Client Diagnoses Data:', error);
      });
  }, []);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleViewEditClick = (page, clientID) => {
    // Redirect to the new page with the medication data
    if (page ==='medication'){
    navigate(`/medication-details/${clientID}`);
    }
    else if (page === 'diagnosis'){
    navigate('/diagnosis_details');
    }
  };

  const getColorByRisk = (risk) => {
    switch (risk) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'High':
        return 'red';
      default:
        return 'white'; // or any default color
    }
  };

  
  return (
    <>
    <div className="container-fluid mt-3">
    <div className="row">
      <div className="col-4">
        <Card>
          <Card.Body>
            <Card.Title>{client.first_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Age: {client.age} | Sex: {client.sex}
            </Card.Subtitle>
            <Card.Text>
              <strong>Address:</strong> {client.address}
              <br />
              <strong>Phone:</strong> {client.mobile_phone}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      {/* Add other components or content in the remaining columns if needed */}
    </div>
  </div>
    <div className="container-fluid mt-5">
      <div className="row">
        <div className='col-6'>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Medications</Accordion.Header>
              <Accordion.Body>
              <Card>
            <Card.Body>
              <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>Medication Details
      <button className='view-edit' onClick={() => handleViewEditClick("medication", 1)}>
        View/Edit
      </button>              </Card.Title>
              <table className="table">
                <tbody>
                  {clientMedicationData.map((medication, index) => (
                    <tr key={index}>
                      <td style={{ width: '70%' ,borderBottom: '2px solid #000' }}>
                        <strong>Medication:</strong> <br /> {medication.medication}
                        <br /><br />
                        <strong>Comment:</strong> <br /> {medication.comments}
                        <br /><br />
                        <strong>Last Updated By:</strong> <br /> {medication.last_updated_by}
                      </td>
                      <td style={{ width: '30%', borderBottom: '2px solid #000'  }}>
                        <strong>Start Date:</strong> <br /> {medication.start_date}
                        <br /><br />
                        <strong>Stop Date:</strong> <br /> {medication.stop_date}
                        <br /><br />
                        <strong>Status:</strong> <br /> {medication.status}
                        <br /><br />
                        <strong>Last Updated:</strong> <br /> {medication.last_udpated_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>


              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className='col-6'>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Diagnosis</Accordion.Header>
              <Accordion.Body>
              <Card>
            <Card.Body>
              <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>Diagnosis Details
              <button className='view-edit' onClick={() => handleViewEditClick("diagnosis")}>View/Edit</button>
              </Card.Title>
              <table className="table">
                <tbody>
                  {clientDiagnosesData.map((diagnoses, index) => (
                    <tr key={index}>
                      <td style={{ width: '70%', borderBottom: '2px solid #000'   }}>
                        <strong>Diagnoses Name:</strong> <br /> {diagnoses.diagnosis_name}
                        <br /><br />
                        <strong>ICD10 Code:</strong> <br /> {diagnoses.icd10_code}
                        <br /><br />
                        <strong>Comment:</strong> <br /> {diagnoses.comments}
                        <br /><br />
                        <strong>Last Updated By:</strong> <br /> {diagnoses.last_updated_by}
                      </td>
                      <td style={{ width: '30%', borderBottom: '2px solid #000'   }}>
                        <strong>Diagnosis Start Date:</strong> <br /> {diagnoses.start_date}
                        <br /><br />
                        <strong>Diagnosis Stop Date:</strong> <br /> {diagnoses.stop_date}
                        <br /><br />
                        <strong>Status:</strong> <br /> {diagnoses.status}
                        <br /><br />
                        <strong>Last Updated:</strong> <br /> {diagnoses.last_udpated_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className='col-6'>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>SVS</Accordion.Header>
              <Accordion.Body>
              <table className="table">
                    <thead>
                      <tr>
                        <th>Domain</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                    {Object.entries(clientSVSData).map(([key, value], outerIndex) => (
                      <React.Fragment key={outerIndex}>
                        <tr>
                          <td>{key}</td>
                          <td style={{ backgroundColor: getColorByRisk(value.risk) }}>{value.risk}</td>
                        </tr>
                        {/*
                        {Object.entries(value).map(([nestedKey, nestedValue], innerIndex) => (
                          <tr key={innerIndex}>
                            <td>{nestedKey}</td>
                            <td>{nestedValue}</td>
                          </tr>
                        ))}
                        */}
                      </React.Fragment>
                    ))}

                        
                       
                  </tbody>
                  </table>
            </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
    </>
  );
}

export default ClientChart;
