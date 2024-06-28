import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Card, CardContent, Container, Paper } from '@mui/material';
import apiURL from "../../apiConfig";


const DataFetchComponent = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchData = async () => {

        try {
            const response = await axios.get('https://amd-backend.dataterrain-demo.net/api/dataFromMSSQL/', {
                params: {
                    name: name,
                    phone: phoneNumber,
                    dob: dob,
                }
            });
            console.log(response.data)

            setResponseData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }

    };

    return (
        <Container maxWidth="md" className='bg-white p-4 shadow'>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                Enter Patient Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Date of Birth"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchData}
                    >
                        Submit
                    </Button>
                </Grid>
                {responseData && (
                    <div className='border-1 border-gray-500/50 mx-4'>
                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Typography variant="h5" gutterBottom>
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Patient Name:</strong> {responseData[0].Name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Date of Birth:</strong> {responseData[0].DOB}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Gender:</strong> {responseData[0].Gender == "M" ? "Male" : "Female"}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Notes:</strong> {responseData[0].Notes}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><strong>Admission Type:</strong> {responseData[0].AdmissionTypecode == "1" ? "Emergency" : responseData[0].AdmissionTypecode == "2" ? "Urgent" : responseData[0].AdmissionTypecode == "3" ? "Elective" : "New born"}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><strong>Diagnosis Type:</strong> {responseData[0].AdmittingDiagnosisTypeCode == "BJ" ? "Admitting" : "Unscheduled Outpatient Visit"}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><strong>Note Type:</strong> {responseData[0].NoteType == "ALG" ? "Allergies" :
                                        responseData[0].NoteType == "DCP" ? "Goals, Rehabilitation Potential, or Discharge Plans" :
                                            responseData[0].NoteType == "DGN" ? "Diagnosis Description" :
                                                responseData[0].NoteType == "DME" ? "Durable Medical Equipment (DME) and Supplies" :
                                                    responseData[0].NoteType == "MED" ? "Medications" :
                                                        responseData[0].NoteType == "NTR" ? "Nutritional Requirements" :
                                                            responseData[0].NoteType == "ODT" ? "Orders for Disciplines and Treatments" :
                                                                responseData[0].NoteType == "RHB" ? "Functional Limitations, Reason Homebound, or Both" :
                                                                    responseData[0].NoteType == "RLH" ? "Reasons Patient Leaves Home" :
                                                                        responseData[0].NoteType == "RNH" ? "Times and Reasons Patient Not at Home" :
                                                                            responseData[0].NoteType == "SET" ? "Unusual Home, Social Environment, or Both" :
                                                                                responseData[0].NoteType == "SFM" ? "Safety Measures" :
                                                                                    responseData[0].NoteType == "SPT" ? "Supplementary Plan of Treatment" :
                                                                                        "Updated Information"}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><strong>Patient Status:</strong> {responseData[0].PatientStatusCode == "01" ?
                                        "Discharged - Home or Self Care" :
                                        responseData[0].PatientStatusCode == "02" ?
                                            "Discharge/Transfer - Hospital " :
                                            responseData[0].PatientStatusCode == "03" ?
                                                "Discharge/Transfer - SNF " :
                                                responseData[0].PatientStatusCode == "04" ?
                                                    "Discharge/Transfer - ICF " :
                                                    responseData[0].PatientStatusCode == "05" ?
                                                        "Discharge/Transfer - Institute" :
                                                        responseData[0].PatientStatusCode == "06" ?
                                                            "Discharge/Transfer - HH Org" :
                                                            responseData[0].PatientStatusCode == "07" ?
                                                                "Left/Discontinued - Care" :
                                                                responseData[0].PatientStatusCode == "08" ?
                                                                    "Discharge/Transfer - Home IV" :
                                                                    responseData[0].PatientStatusCode == "09" ?
                                                                        "Admitted as Inpatient" :
                                                                        responseData[0].PatientStatusCode == "20" ?
                                                                            "Expired" :
                                                                            responseData[0].PatientStatusCode == "30" ?
                                                                                "Still Patient" :
                                                                                responseData[0].PatientStatusCode == "40" ?
                                                                                    "Expired at Home" :
                                                                                    responseData[0].PatientStatusCode == "41" ?
                                                                                        "Expired in Medical Facility" :
                                                                                        responseData[0].PatientStatusCode == "42" ?
                                                                                            "Expired - Place Unknown" :
                                                                                            responseData[0].PatientStatusCode == "50" ?
                                                                                                "Hospice - Home" :
                                                                                                responseData[0].PatientStatusCode == " 51" ?
                                                                                                    "Hospice - Medical Facility" :
                                                                                                    responseData[0].PatientStatusCode == "61" ?
                                                                                                        "Discharge/Transfer - Swing Bed" :
                                                                                                        responseData[0].PatientStatusCode == "62" ?
                                                                                                            "Discharge/Transfer - To Rehab" :
                                                                                                            responseData[0].PatientStatusCode == "63" ?
                                                                                                                "Discharge/Transfer - Term Care" :
                                                                                                                responseData[0].PatientStatusCode == "71" ?
                                                                                                                    "Discharge/Transfer - Other Ins" :
                                                                                                                    "Discharge/Transfer - This Ins"}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                )}
            </Grid>
        </Container>
    );
};

export default DataFetchComponent;
