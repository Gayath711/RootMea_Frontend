import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Card, CardContent, Container } from '@mui/material';

const DataFetchComponent = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchData = () => {
        // Simulating a fetch request (replace with actual fetch logic)
        // This is just a placeholder to demonstrate functionality

        try {
            const response = axios.get('https://amd-backend.dataterrain-demo.net/api/dataFromMSSQL/', {
                params: {
                    name: name,
                    phone: phoneNumber,
                    dob: dob,
                }
            });
            setResponseData(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }

    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" color="primary" gutterBottom align="center">
                Data Fetch Form
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
                        Fetch Data
                    </Button>
                </Grid>
                {responseData && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    Response Data
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Name:</strong> {responseData.name}<br />
                                    <strong>Phone Number:</strong> {responseData.phone}<br />
                                    <strong>Date of Birth:</strong> {responseData.dob}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default DataFetchComponent;
