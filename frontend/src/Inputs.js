import React, { useState } from 'react';
import {
  Card,CardContent,Box,Button,InputLabel,AccordionSummary,Typography,AccordionDetails,Accordion,Container,CssBaseline, AppBar, Toolbar
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CoordinateSystem from "./CoordinateSystem";
import UnmannedSystems from "./UnmannedSystems";
import ShowInputs from "./ShowInputs";

const Inputs = () => {
    const [coordData, setCoordData] = useState({ baseCoord: {}, reconCoord: {} });
    const [minCoverage, setMinCoverage] = useState('');
    const [uavData, setUavData] = useState({});
    const [apiResponse, setApiResponse] = useState("");
    const [timeData, setTimeData] = useState(''); 

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
            uavData
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
                body: JSON.stringify({ selectedUAVs: jsonData }),
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
                  OSD Modeling
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

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
          </Box>
        </div>
    );
};

export default Inputs;