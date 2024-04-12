import React from 'react';
import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";

const ShowInputs = ({ uavData, minCoverage, coordData, durationData }) => {
    return (
        <Box sx={{ '& > :not(style)': { m: 2 }, }} style={{ textAlign: 'center' }}>
            <Card>
                <CardContent>
                    <Container style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Grid container spacing={1} justifyContent="center" alignItems="center">

                            {/* Hours */}
                            <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper style={{ padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{durationData ? `${durationData}` : '0'}</Typography>
                                    <Typography variant="h6">Hours Duration</Typography>
                                </Paper>
                            </Grid>

                            {/* Minimum Coverage */}
                            <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper style={{ padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{minCoverage ? `${minCoverage}` : '0'} %</Typography>
                                    <Typography variant="h6">Minimum Coverage</Typography>
                                </Paper>
                            </Grid>

                            {/* Size */}
                            <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper style={{ padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{coordData.size ? `${coordData.size}` : '0'} km²</Typography>
                                    <Typography variant="h6">Recon Area Size</Typography>
                                </Paper>
                            </Grid>

                            {/* Coordinates */}
                            <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper style={{ padding: '20px' }} elevation={5}>
                                    <Typography variant="h6">Coordinates</Typography>
                                    <Typography variant="h6">Base:</Typography>
                                    {coordData.baseCoord && coordData.reconCoord && (
                                        <Typography color="#f44336" variant="h5">{coordData.baseCoord.lat}N, {coordData.baseCoord.long}E</Typography>
                                    )}
                                    <Typography variant="h6">Recon:</Typography>
                                    {coordData.reconCoord && (
                                        <Typography color="#f44336" variant="h5">{coordData.reconCoord.lat}N, {coordData.reconCoord.long}E</Typography>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Container style={{ textAlign: 'center' }}>
                        <Typography variant="h6" m={2}>UAV's Selected</Typography>
                        <Grid container spacing={1} justifyContent="center" alignItems="center">
                            {uavData && uavData.length > 0 ? (
                                uavData.map((uav, index) => (
                                    <Grid item key={index} xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Paper style={{ padding: '20px' }} elevation={5}>
                                            <Typography variant="h7">Name:</Typography>
                                            <Typography color="#3f50b5" variant="h5">{uav.name}</Typography>
                                            <Typography variant="h7">Coverage:</Typography>
                                            <Typography color="#757ce8" variant="h5">{uav.coverage} km²</Typography>
                                            <Typography variant="h7">Endurance:</Typography>
                                            <Typography color="#757ce8" variant="h5">{uav.endurance} hrs</Typography>
                                            <Typography variant="h7">Speed:</Typography>
                                            <Typography color="#757ce8" variant="h5">{uav.speed} km/hr</Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Paper style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} elevation={5}>Not available</Paper>
                            )}
                        </Grid>
                    </Container>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ShowInputs;
