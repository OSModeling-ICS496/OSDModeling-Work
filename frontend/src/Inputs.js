import React, { useState } from 'react';
import {
  Card,CardContent,Box,Button,InputLabel,AccordionSummary,Typography,AccordionDetails,Accordion,Container,CssBaseline, AppBar, Toolbar, IconButton, Tooltip
} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CoordinateSystem from "./CoordinateSystem";
import UnmannedSystems from "./UnmannedSystems";
import ShowInputs from "./ShowInputs";
import ShowMap from "./ShowMap";

const Inputs = () => {
    const [coordData, setCoordData] = useState({ baseCoord: {}, reconCoord: {} });
    const [minCoverage, setMinCoverage] = useState('');
    const [uavData, setUavData] = useState({});
    const [apiResponse, setApiResponse] = useState("");
    const [timeData, setTimeData] = useState('');
    const [showMap, setShowMap] = useState(false);

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    const handleRunModel = () => {
        localStorage.setItem('coordData', JSON.stringify(coordData));
        const url = window.location.origin + '/outputs';
        window.open(url, '_blank');
    };

    const handleCoordinateChange = (data) => {
        setCoordData(data);
    };

    const handleCoverageChange = (coverage) => {
        setMinCoverage(coverage);
    };

    const handleUnmannedSystemsChange = (data) => {
        setUavData(data);
    };

    const handleTimeChange = (newTime) => {
        setTimeData(newTime); 
    };

    const integrateData = () => {
        const integratedData = {
            coordData,
            minCoverage,
            uavData,
            timeData
        };
        return integratedData;
    };

    const handleSubmit = async () => {
        const jsonData = integrateData();
        console.log(jsonData);

        try {
            // New API link here
            const response = await fetch('https://96k2qcbm5k.execute-api.us-east-1.amazonaws.com/default/Test1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jsonData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            setApiResponse(JSON.stringify(responseData, null, 2));
        } catch (error) {
            console.error('Error calling API:', error);
            setApiResponse("Error calling API: " + error.message);
        }
    };

    return (
        <div>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute">
              <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                  Inputs
                </Typography>
                  <Tooltip title={showMap ? 'Hide Map' : 'Show Map'}>
                      <IconButton color="gray" onClick={toggleMap} sx={{ transform: 'scale(1.2)', mr: '5px' }}>
                          <MapIcon />
                      </IconButton>
                  </Tooltip>


                  <Button variant="contained" color="success" onClick={handleRunModel}>Run Model</Button>
              </Toolbar>
                {
                    showMap &&
                    (
                        <Box sx={{ position: 'absolute', right: '60%', top: '5rem', width: '20vw'}}>
                            <ShowMap coordData={coordData} />
                        </Box>
                    )
                }
            </AppBar>

              <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>

                  <Container>
                      <Accordion id="inputs">
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                          >
                              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                  Modify Model
                              </Typography>
                              <Typography sx={{color: 'text.secondary'}}>Add/modify inputs to run model</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Box
                                  component="div"
                                  sx={{
                                      '& > :not(style)': { m: 1 },
                                  }}
                                  noValidate
                                  autoComplete="off"
                              >
                                  <Card>
                                      <CardContent>
                                          {/* CoordinateSystem */}
                                          <CoordinateSystem
                                              onCoordinateChange={handleCoordinateChange}
                                              onCoverageChange={handleCoverageChange}
                                              onTimeChange={handleTimeChange}
                                          />
                                          {/* Unmanned Systems */}
                                          <UnmannedSystems onUnmannedSystemsChange={handleUnmannedSystemsChange} />
                                      </CardContent>
                                  </Card>

                                  <Button variant="contained" onClick={handleSubmit}>UPLOAD DATA</Button>

                                  {/* API Response Display */}
                                  <Card>
                                      <CardContent>
                                          <InputLabel>API Response:</InputLabel>
                                          <pre>{apiResponse}</pre>
                                      </CardContent>
                                  </Card>
                              </Box>
                          </AccordionDetails>
                      </Accordion>

                      {/* ShowInputs Component */}
                      <ShowInputs
                          uavData={uavData}
                          minCoverage={minCoverage}
                          coordData={coordData}
                          timeData={timeData}
                      />
                  </Container>

              </Container>
          </Box>
        </div>
    );
};

export default Inputs;