import React, { useState } from 'react';
import { Card, CardContent, Box, Button, InputLabel, AccordionSummary, Typography, AccordionDetails, Accordion, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Coordinate from "./Coordinate";
import TimeAndCoverage from "./TimeAndCoverage";
import UnmannedSystems from "./UnmannedSystems";
import ShowInputs from "./ShowInputs";

const Inputs = () => {
    const [coordData, setCoordData] = useState({});
    const [timeData, setTimeData] = useState({});
    const [coverageData, setCoverageData] = useState({});
    const [uavData, setUavData] = useState({});
    const [apiResponse, setApiResponse] = useState("");

    const handleCoordinateChange = (data) => {
        setCoordData(data);
    };

    const handleTimeChange = (data) => {
        setTimeData(data);
    };

    const handleCoverageChange = (data) => {
        setCoverageData(data);
    };

    const handleUnmannedSystemsChange = (data) => {
        setUavData(data);
    };

    const integrateData = () => {
        const integratedData = {
            coordData,
            timeData,
            coverageData,
            uavData
        };
        return integratedData;
    };

    const handleSubmit = async () => {
        const jsonData = integrateData();
        console.log(jsonData);

        try {
            //new api link here
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
                                {/* Coordinate */}
                                <Coordinate onCoordinateChange={handleCoordinateChange} />
                                {/* TimeAndCoverage */}
                                <TimeAndCoverage onCoverageChange={handleCoverageChange} onTimeChange={handleTimeChange} />
                                {/* Unmanned Systems */}
                                <UnmannedSystems onUnmannedSystemsChange={handleUnmannedSystemsChange} />
                            </CardContent>
                        </Card>

                        <Button variant="contained" onClick={handleSubmit}>UPLOAD DATA</Button>

                        <Card>
                            <CardContent>
                                <InputLabel>API Response:</InputLabel>
                                <pre>{apiResponse}</pre>
                                <pre>
                        {   "Example:\n" +
                            "{coordData: Array(3), timeData: '30', coverageData: '5', uavData: Array(2)}\n" +
                            "\n" +
                            "\n" +
                            "coordData: Array(3)\n" +
                            "\t0: {lat: '0', lng: '0', order: 1}\n" +
                            "\t1: {lat: '1', lng: '1', order: 2}\n" +
                            "\t2: {lat: '2', lng: '2', order: 3}\n" +
                            "coverageData: \"5\"\n" +
                            "timeData: \"30\"\n" +
                            "uavData: Array(2)\n" +
                            "\t0: {name: 'Global Hawk', range: '22800.00', endurance: '38.00'}\n" +
                            "\t1: {name: 'Gray Eagle', range: '6000.00', endurance: '25.00'}"}
                    </pre>
                            </CardContent>
                        </Card>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <ShowInputs
                GetuavData={() => uavData}
                GetcoverageData={() => coverageData}
                GettimeData={() => timeData}
                GetcoordData={() => coordData}
            />


        </Container>
    );
};

export default Inputs;