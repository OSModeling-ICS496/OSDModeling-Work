import React, { useState } from 'react';
import { Card, CardContent, Box, Button, InputLabel, AccordionSummary, Typography, AccordionDetails, Accordion, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Coordinate from "./Coordinate";
import MinCoverage from "./MinCoverage";
import UnmannedSystems from "./UnmannedSystems";
import ShowInputs from "./ShowInputs";

const Inputs = () => {
    const [coordData, setCoordData] = useState({});
    const [totalArea, settotalArea] = useState(0);
    const [timeData, setTimeData] = useState(0);
    const [minCoverage, setMinCoverage] = useState({});
    const [uavData, setUavData] = useState({});
    const [apiResponse, setApiResponse] = useState("");

    const handleCoordinateChange = (data) => {
        const totalSize = data.reduce((acc, curr) => acc + parseFloat(curr.size || 0), 0);
        const totalTime = data.reduce((acc, curr) => acc + parseFloat(curr.time || 0), 0);

        setCoordData(data);
        settotalArea(totalSize);
        setTimeData(totalTime);
    };

    const handleTimeChange = (data) => {
        setTimeData(data);
    };

    const handleCoverageChange = (data) => {
      setMinCoverage(data);
    };

    const handleUnmannedSystemsChange = (data) => {
        setUavData(data);
    };

    const integrateData = () => {
        const integratedData = {
            coordData,
            timeData,
            minCoverage,
            totalArea,
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
                                {/* MinCoverage */}
                                <MinCoverage onCoverageChange={handleCoverageChange}  />
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
                            "coordData: Array(3)\n" +
                            "\t0: {lat: '1', lng: '1', order: 1, size: '1', time: '2'}\n" +
                            "\t1: {lat: '2', lng: '2', order: 2, size: '2', time: '3'}\n" +
                            "\t2: {lat: '3', lng: '3', order: 3, size: '3', time: '4'}\n" +
                            "minCoverage: \"80\"\n" +
                            "timeData: \"9\"\n" +
                            "totalArea: \"6\"\n" +
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
                GetminCoverage={() => minCoverage}
                GettotalArea={() => totalArea}
                GettimeData={() => timeData}
                GetcoordData={() => coordData}
            />

        </Container>
    );
};

export default Inputs;