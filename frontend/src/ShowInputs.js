import React from 'react';
import { Box, Card, CardContent, Container, Grid, Paper, Typography, Button } from "@mui/material";

const ShowInputs = ({ uavData, minCoverage, coordData, timeData }) => {

  const handleRunModel = () => {
    const url = `${window.location.origin}/outputs?${coordData}`;
    window.open(url, '_blank');
  };

    return (
        <Box sx={{'& > :not(style)': { m: 2 },}} style={{ textAlign: 'center' }}>
            {/* User Inpouts Displayed */}
            <Card>
                <CardContent>
                    <Container style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Grid container spacing={1} justifyContent="center">
                            
                            {/* Hours */}
                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{timeData ? `${timeData}` : '0'}</Typography>
                                    <Typography variant="h6">Hours</Typography>
                                </Paper>
                             </Grid>

                            {/* Minimum Coverage */}
                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                 <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{minCoverage ? `${minCoverage}` : '0'} %</Typography>
                                    <Typography variant="h6">Minimum Coverage</Typography>
                                </Paper>
                            </Grid>

                            {/* Size */}
                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                 <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography color="#f44336" variant="h4">{coordData.size ? `${coordData.size}` : '0'} km²</Typography>
                                    <Typography variant="h6">Recon Area Size</Typography>
                                </Paper>
                            </Grid>
                            
                            {/* Coordinates */}
                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                 <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                    <Typography variant="h6">Coordinates</Typography>
                                    <Typography variant="h6">Base:</Typography>
                                    {coordData.baseCoord && (
                                        <Typography color="#f44336" variant="h5">{coordData.baseCoord.lat}N, {coordData.baseCoord.lng}E</Typography>
                                    )}
                                         <Typography variant="h6">Recon:</Typography>
                                    {coordData.reconCoord && (
                                        <Typography color="#f44336" variant="h5">{coordData.reconCoord.lat}N, {coordData.reconCoord.lng}E</Typography>
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
                        <Grid container spacing={1} justifyContent="center">
                            {uavData && uavData.length > 0 ? (
                                uavData.map((uav, index) => (
                                    <Grid item key={index} xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Paper style={{ width: 'fit-content', padding: '20px' }} elevation={5}>
                                            <Typography color="#3f50b5" variant="h5">{uav.name}</Typography>
                                            <Typography variant="h7">Range:</Typography>
                                            <Typography color="#757ce8" variant="h5">{uav.range}</Typography>
                                            <Typography variant="h7">Endurance:</Typography>
                                            <Typography color="#757ce8" variant="h5">{uav.endurance}</Typography>
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
              <Button variant="contained" onClick={handleRunModel}>Run Model</Button>
            </CardContent>
          </Card>
        </Box>
    );
};

export default ShowInputs;