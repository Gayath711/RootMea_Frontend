import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';

import { COLUMNS } from './constants';
import './css/clientprofilelanding.module.css'
import SearchBar from './SearchBar';

function ClientProfileLandingPage({ onLogout }) {
  const [clientData, setClientData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`http://192.168.3.24:8000/clientinfo-api?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClientData(response.data);
      console.log(clientData)
    } catch (error) {
      console.error('Error fetching Client Data:', error);
    }
  };



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // return (
  // <div className="container">
  //   <h2>Clients</h2>

  //   <div className="row justify-content-end mb-3">
  //     <div className="col-md-4">
  //       <input
  //         className="form-control"
  //         type="search"
  //         placeholder="Search"
  //         aria-label="Search"
  //         value={searchQuery}
  //         onChange={handleSearch}
  //       />
  //     </div>
  //   </div>
  //   <Table striped bordered hover responsive>
  //     <thead>
  //       <tr>
  //         <th className="text-center">ID</th>
  //         <th className="text-center">First Name</th>
  //         <th className="text-center">Last Name</th>
  //         <th className="text-center">DOB</th>
  //         <th className="text-center">Gender Identity</th>
  //         <th className="text-center">Social Risk Housing</th>
  //         <th className="text-center">Mobile Number</th>
  //         <th className="text-center">Status on this List</th>
  //         <th className="text-center">Client Profile</th>
  //         <th className="text-center">Client Chart</th>
  //         <th className="text-center">Encounter Note</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {clientData.map(client => (
  //         <tr key={client.id}>
  //           <td className="text-center">{client.id}</td>
  //           <td className="text-center">
  //             <Link to={`/clientprofile/${client.id}`}>{client.first_name}</Link>
  //           </td>
  //           <td className="text-center">{client.last_name}</td>
  //           <td className="text-center">{client.date_of_birth}</td>
  //           <td className="text-center">{client.sex}</td>
  //           <td className="text-center">{client.social_risk_score}</td>
  //           <td className="text-center">{client.mobile_number}</td>
  //           <td className="text-center">Engaged</td>
  //           <td className="text-center">
  //             <Link to={`/clientprofile/${client.id}`}>
  //               <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
  //             </Link>
  //           </td>
  //           <td className="text-center">
  //             <Link to={`/clientchart/${client.id}`}>
  //               <FontAwesomeIcon icon={faChartLine} style={{ color: 'red' }} />
  //             </Link>
  //           </td>
  //           <td className="text-center">
  //             <Link to={`/encounter_note/`}>
  //               <FontAwesomeIcon icon={faStickyNote} style={{ color: 'black' }} />
  //             </Link>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </Table>
  // </div>
  // );

  const [data, setData] = useState([{
    "id": 10, "first_name": "Myra", "middle_name": "B", "last_name": "Williams", "nickname_preferred_name": "Myra", "preferred_pronouns": "She/Her", "email_address": "Myra@roots.org", "mobile_number": 755068929, "home_phone": "512-210-1007", "work_phone": "512-100-2007", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1989-06-01", "age": 35, "sex": "Female", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "Coach Surfing", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Female", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1241 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 11", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "CVS", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1010", "insurance_primary_carrier_name": "Oakland Health Insurance", "insurance_primary_subscriber_id": "123463", "insurance_primary_subscriber_name": "Myra Williams", "insurance_primary_group_name": "ABC130", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Oakland Health Insurance", "insurance_secondary_subscriber_id": "123463", "insurance_secondary_subscriber_name": "Myra Williams", "insurance_secondary_group_name": "ABC130", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Oakland Health Insurance", "insurance_tertiary_subscriber_id": "123463", "insurance_tertiary_subscriber_name": "Myra Williams", "insurance_tertiary_group_name": "ABC130", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "19 7th Ave", "emergency_contact_1_address_line_2": "Apt 11", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806684, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "19 7th Ave", "emergency_contact_2_address_line_2": "Apt 11", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806684, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12352", "system_information_chart_number": "96726", "system_information_system_id": "3092",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }, {
    "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
    "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey"
  }
  ]);
  const columns = useMemo(() => COLUMNS, []);
  // const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });


  const calculateHeaderWidth = (header) => {
    const dummyHeader = document.createElement('span');
    dummyHeader.textContent = header;
    document.body.appendChild(dummyHeader);
    const width = dummyHeader.offsetWidth;
    document.body.removeChild(dummyHeader);
    console.log("width", width)
    return width;
  };

  return (
    <div className='flex flex-col px-3 mt-2'>
      <div className='flex flex-row justify-between pb-8 mt-3'>
        <div className='text-2xl font-semibold'>
          STOMP Housing Outreach List - Expired CE Applications
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="rounded-sm" style={{ overflowX: 'auto', width: 'calc(100vw)' }}>
        <table {...getTableProps()} className="">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>
                  Action
                </th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
                <th>
                  Client Profile
                </th>
                <th>
                  Client Chart
                </th>
                <th>
                  New Encounter Note
                </th>
              </tr>
            ))}

          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  <td>
                    view
                  </td>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  <td className='text-center'>
                    <img src="./client-profile.png" className="size-6 rounded-full" style={{ display: 'block', margin: '0 auto' }} />
                    {/* Test */}
                  </td>
                  <td className='text-center'>
                    <img src="./client-chart.png" className="size-6" alt="client-chart" style={{ display: 'block', margin: '0 auto' }} />
                  </td>
                  <td className='text-center'>
                    <img src="./encounter-notes.png" className="size-6" alt="client-chart" style={{ display: 'block', margin: '0 auto' }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default ClientProfileLandingPage;