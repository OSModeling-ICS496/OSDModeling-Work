import React, { useState, useEffect } from 'react';
import {Box, Card, CardContent, Container, Grid, Paper, Typography} from "@mui/material";

const ShowInputs = ({ GetuavData, GetcoverageData, GettimeData, GetcoordData }) => {
    const [coordData, setCoordData] = useState({});
    const [timeData, setTimeData] = useState({});
    const [coverageData, setCoverageData] = useState({});
    const [uavData, setUavData] = useState({});

    useEffect(() => {
        setCoordData(GetcoordData());
        setTimeData(GettimeData());
        setCoverageData(GetcoverageData());
        setUavData(GetuavData());
    }, [GetuavData, GetcoverageData, GettimeData, GetcoordData]);

    return (
        <Box sx={{'& > :not(style)': { m: 2 },}} style={{ textAlign: 'center' }}>
            <Card>
                <CardContent>
                    <Container style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{timeData ? timeData.toString() : '0'}</Typography>
                                    <Typography variant="h6">MINUTES MISSION</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{coverageData ? coverageData.toString() : '0'}</Typography>
                                    <Typography variant="h6">SQUARE MILES COVERAGE</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Container style={{ textAlign: 'center' }}>
                        <Typography variant="h6" m={4}>COORDINATE</Typography>
                        <Grid container spacing={1} justifyContent="center">
                            {coordData && coordData.length > 0 ? (
                                coordData.map((coord, index) => (
                                    <Grid item key={index} xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                            <Typography color="#357a38" variant="h4">
                                                {coord.lat}N° {coord.lng}W°
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>Not available</Paper>
                            )}
                        </Grid>
                    </Container>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Container style={{ textAlign: 'center' }}>
                        <Typography variant="h6" m={4}>UAV COMBINATORIAL</Typography>
                        <Grid container spacing={1} justifyContent="center">
                            {uavData && uavData.length > 0 ? (
                                uavData.map((uav, index) => (
                                    <Grid item key={index} xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                            <Typography color="#3f50b5" variant="h4">{uav.name}</Typography>
                                            <Typography variant="h6">Range:</Typography>
                                            <Typography color="#757ce8" variant="h4">{uav.range}</Typography>
                                            <Typography variant="h6">Endurance:</Typography>
                                            <Typography color="#757ce8" variant="h4">{uav.endurance}</Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>Not available</Paper>
                            )}
                        </Grid>
                    </Container>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ShowInputs;
