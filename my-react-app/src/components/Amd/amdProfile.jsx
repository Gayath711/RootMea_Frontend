import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Sidebar.css";
import Sidebar from "../ClientProfileForm/SideBar";
import AlertSuccess from "../common/AlertSuccess";
import AlertError from "../common/AlertError";
import { useParams } from "react-router-dom";
import axios from "../../helper/axiosInstance";
import { Typography, Paper, Grid } from '@material-ui/core';


const initialValues = {
    first_name: null,
    middle_name: null,
    last_name: null,
    nickname_preferred_name: null,
    preferred_pronouns: null,
    email_address: null,
    mobile_number: null,
    home_phone: null,
    work_phone: null,
    best_way_to_contact: null,
    primary_phone: null,
    comfortable_language: null,
    other_language: null,
    date_of_birth: null,
    age: null,
    sex: null,
    social_security_number: null,
    us_armed_forces: null,
    describe_the_place_you_live: null,
    race: null,
    other_race: null,
    ethnicity: null,
    gender_identity: null,
    other_gender_identity: null,
    sexual_orientation: null,
    other_sexual_orientation: null,
    mailing_address_line_1: null,
    mailing_address_line_2: null,
    city: null,
    state: null,
    zip: null,
    usual_location: null,
    preferred_pharmacy_name: null,
    preferred_pharmacy_location: null,
    preferred_pharmacy_phone: null,
    insurance_primary_carrier_name: null,
    insurance_primary_subscriber_id: null,
    insurance_primary_subscriber_name: null,
    insurance_primary_group_name: null,
    insurance_primary_group_id: null,
    insurance_primary_relation_to_insured: null,
    insurance_primary_effective_from: null,
    insurance_primary_effective_to: null,
    insurance_secondary_carrier_name: null,
    insurance_secondary_subscriber_id: null,
    insurance_secondary_subscriber_name: null,
    insurance_secondary_group_name: null,
    insurance_secondary_group_id: null,
    insurance_secondary_relation_to_insured: null,
    insurance_secondary_effective_from: null,
    insurance_secondary_effective_to: null,
    insurance_tertiary_carrier_name: null,
    insurance_tertiary_subscriber_id: null,
    insurance_tertiary_subscriber_name: null,
    insurance_tertiary_group_name: null,
    insurance_tertiary_group_id: null,
    insurance_tertiary_relation_to_insured: null,
    insurance_tertiary_effective_from: null,
    insurance_tertiary_effective_to: null,
    emergency_contact_1_name: null,
    emergency_contact_1_email_address: null,
    emergency_contact_1_relationship: null,
    emergency_contact_1_address_line_1: null,
    emergency_contact_1_address_line_2: null,
    emergency_contact_1_city: null,
    emergency_contact_1_state: null,
    emergency_contact_1_zip: null,
    emergency_contact_1_phone: null,
    emergency_contact_2_name: null,
    emergency_contact_2_email_address: null,
    emergency_contact_2_relationship: null,
    emergency_contact_2_address_line_1: null,
    emergency_contact_2_address_line_2: null,
    emergency_contact_2_city: null,
    emergency_contact_2_state: null,
    emergency_contact_2_zip: null,
    emergency_contact_2_phone: null,
    system_information_original_data_source: null,
    system_information_import_notes: null,
    system_information_import_date: null,
    system_information_prn: null,
    system_information_chart_number: null,
    system_information_system_id: null,
    custom_fields: null,
};

const patientValues = {
    'Name': null,
    'Address': null,
    'City': null,
    'State': null,
    'Country': null,
    'PhoneNumber': null,
    'DOB': null,
    'Email': null,
    'Gender': null,
    'Notes': null,
    'NoteType': null,
    'AdmissionTypecode': null,
    'AdmittingDiagnosisTypeCode': null,
    'PatientStatusCode': null,
    'AdmissionDate': null

};

const errorInitialValues = {
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    emergency_contact_1_email_address: "",
    emergency_contact_1_zip: "",
    emergency_contact_2_email_address: "",
    emergency_contact_2_zip: "",
    age: "",
    zip_address_n_usual_location: "",
};

const PatientList = ({ isNew }) => {
    const { clientId } = useParams();
    const location = useLocation();
    const [isEditable, setIsEditable] = useState(!isNew);
    const [clientData, setClientData] = useState(initialValues);
    const [patientData, setpatientData] = useState(patientValues);
    const [errors, setErrors] = useState(errorInitialValues);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [customFieldsAll, setCustomFieldsAll] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [badge, setBadge] = useState({});


    useEffect(() => {
        if (clientId) {
            axios
                .get(`/clientinfo-api/${clientId}`)
                .then((response) => {
                    setClientData(response.data);
                    axios
                        .get(`/api/dataFromMSSQL/`, { params: { clientId: clientId } })
                        .then((res) => {
                            setpatientData(res.data[0]);
                            console.log(res.data)

                        })
                        .catch((error) => {
                            console.error("Error fetching client data:", error);
                        });

                })
                .catch((error) => {
                    console.error("Error fetching client data:", error);
                });

        }
    }, [clientId]);


    const closeSuccessAlert = () => setShowSuccessAlert(false);
    const closeErrorAlert = () => setShowErrorAlert(false);

    const handleClick = (accordionId) => {
        console.log("Inside handleClick");
        console.log("accordian id", `accordion-${accordionId}`);
        const accordionElement = document.getElementById(
            `accordian-${accordionId}`
        );
        console.log("accordionElement", accordionElement);
        if (accordionElement) {
            console.log("Inside accordionElement");
            accordionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="h-full bg-gray-50">
            {showSuccessAlert && (
                <AlertSuccess
                    message="Saved successfully"
                    handleClose={closeSuccessAlert}
                />
            )}
            {showErrorAlert && (
                <AlertError
                    message={errorMsg || "Invalid form values"}
                    handleClose={closeErrorAlert}
                />
            )}
            <div className="bg-white p-4 shadow">
                {(
                    <div className="flex justify-between mb-0 mt-4 pl-4">
                        <div className="flex space-x-12">
                            <h2 className="text-gray-800 text-2xl font-medium">
                                AMD Profile: {patientData.Name}
                            </h2>
                        </div>
                        <div className="flex space-x-8">
                            <Link to={"/"}>
                                <p className="text-green-700 font-medium">Dashboard</p>
                            </Link>
                            <a href={`/amd/${clientId}`} target="_blank">
                                <p className="text-green-700 font-medium">AMD Profile</p>
                            </a>
                            <p className="text-green-700 font-medium pr-8">Manage Program</p>
                        </div>
                    </div>
                )}

                <div className="border-b border-green-800 mt-2 mb-4"></div>
                <div className="flex">
                    <Sidebar
                        handleClick={handleClick}
                        isNew={isNew}
                        isEditable={isEditable}
                    />
                    <div className="w-full px-2 space-y-4">
                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Typography variant="h6" gutterBottom>
                                General Information :
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Name: {patientData.Name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">DOB: {patientData.DOB}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Gender: {patientData.Gender == "M" ? "Male" : "Female"}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Address: {patientData.Address}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Typography variant="h6" gutterBottom>
                                Medical History :
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Notes: {patientData.Notes}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Note Type: {patientData.NoteType == "ALG" ? "Allergies" :
                                        patientData.NoteType == "DCP" ? "Goals, Rehabilitation Potential, or Discharge Plans" :
                                            patientData.NoteType == "DGN" ? "Diagnosis Description" :
                                                patientData.NoteType == "DME" ? "Durable Medical Equipment (DME) and Supplies" :
                                                    patientData.NoteType == "MED" ? "Medications" :
                                                        patientData.NoteType == "NTR" ? "Nutritional Requirements" :
                                                            patientData.NoteType == "ODT" ? "Orders for Disciplines and Treatments" :
                                                                patientData.NoteType == "RHB" ? "Functional Limitations, Reason Homebound, or Both" :
                                                                    patientData.NoteType == "RLH" ? "Reasons Patient Leaves Home" :
                                                                        patientData.NoteType == "RNH" ? "Times and Reasons Patient Not at Home" :
                                                                            patientData.NoteType == "SET" ? "Unusual Home, Social Environment, or Both" :
                                                                                patientData.NoteType == "SFM" ? "Safety Measures" :
                                                                                    patientData.NoteType == "SPT" ? "Supplementary Plan of Treatment" :
                                                                                        patientData.NoteType == "UPI" ? "Updated Information" : ""}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Patient Status: {patientData.PatientStatusCode == "01" ?
                                        "Discharged - Home or Self Care" :
                                        patientData.PatientStatusCode == "02" ?
                                            "Discharge/Transfer - Hospital " :
                                            patientData.PatientStatusCode == "03" ?
                                                "Discharge/Transfer - SNF " :
                                                patientData.PatientStatusCode == "04" ?
                                                    "Discharge/Transfer - ICF " :
                                                    patientData.PatientStatusCode == "05" ?
                                                        "Discharge/Transfer - Institute" :
                                                        patientData.PatientStatusCode == "06" ?
                                                            "Discharge/Transfer - HH Org" :
                                                            patientData.PatientStatusCode == "07" ?
                                                                "Left/Discontinued - Care" :
                                                                patientData.PatientStatusCode == "08" ?
                                                                    "Discharge/Transfer - Home IV" :
                                                                    patientData.PatientStatusCode == "09" ?
                                                                        "Admitted as Inpatient" :
                                                                        patientData.PatientStatusCode == "20" ?
                                                                            "Expired" :
                                                                            patientData.PatientStatusCode == "30" ?
                                                                                "Still Patient" :
                                                                                patientData.PatientStatusCode == "40" ?
                                                                                    "Expired at Home" :
                                                                                    patientData.PatientStatusCode == "41" ?
                                                                                        "Expired in Medical Facility" :
                                                                                        patientData.PatientStatusCode == "42" ?
                                                                                            "Expired - Place Unknown" :
                                                                                            patientData.PatientStatusCode == "50" ?
                                                                                                "Hospice - Home" :
                                                                                                patientData.PatientStatusCode == " 51" ?
                                                                                                    "Hospice - Medical Facility" :
                                                                                                    patientData.PatientStatusCode == "61" ?
                                                                                                        "Discharge/Transfer - Swing Bed" :
                                                                                                        patientData.PatientStatusCode == "62" ?
                                                                                                            "Discharge/Transfer - To Rehab" :
                                                                                                            patientData.PatientStatusCode == "63" ?
                                                                                                                "Discharge/Transfer - Term Care" :
                                                                                                                patientData.PatientStatusCode == "71" ?
                                                                                                                    "Discharge/Transfer - Other Ins" :
                                                                                                                    patientData.PatientStatusCode == "72" ?
                                                                                                                        "Discharge/Transfer - This Ins" : ""}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Diagnosis Type: {patientData.AdmissionTypecode == "1" ? "Emergency" : patientData.AdmissionTypecode == "2" ? "Urgent" : patientData.AdmissionTypecode == "3" ? "Elective" : patientData.AdmissionTypecode == "4" ? "New born" : ""}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Admission Type: {patientData.AdmittingDiagnosisTypeCode == "BJ" ? "Admitting" : patientData.AdmittingDiagnosisTypeCode == "ZZ" ? "Unscheduled Outpatient Visit" : ""}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>


                    </div>
                </div>


            </div>
        </div >
    );
};

export default PatientList;


