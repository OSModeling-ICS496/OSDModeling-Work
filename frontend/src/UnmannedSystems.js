import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Box, MenuItem, FormControl, Select, Grid, FormHelperText, InputLabel, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UnmannedSystems = ({ onUnmannedSystemsChange }) => {
    const [options, setOptions] = useState([]);
    const [selectedUAVs, setSelectedUAVs] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const fetchOptions = () => {
            Papa.parse('/data/UAV_specs_-_Sheet1.csv', {
                download: true,
                header: true,
                complete: (result) => {
                    const parsedOptions = result.data.map(item => ({
                        name: item['Name(UAV)'],
                        range: item['Range(in km)'],
                        endurance: item['Endurance(in hours)']
                    })).filter(uav => uav.name);
                    setOptions(parsedOptions);
                }
            });
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        onUnmannedSystemsChange(selectedUAVs);
    }, [selectedUAVs]);

    const handleSelectionChange = (event) => {
        const selectedName = event.target.value;
        const uavDetails = options.find(option => option.name === selectedName);
        setSelectedUAVs([...selectedUAVs, uavDetails]);
        setSelectedValue("");
    };

    /**
    const handleSubmit = async () => {
        const content = selectedUAVs.map(uav => ({
            name: uav.name,
            range: uav.range,
            endurance: uav.endurance
        }));

        try {
            const response = await fetch('https://96k2qcbm5k.execute-api.us-east-1.amazonaws.com/default/Test1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ selectedUAVs: content }),
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

    const [apiResponse, setApiResponse] = useState("");
    **/

    const removeUAV = (indexToRemove) => {
        setSelectedUAVs(selectedUAVs.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Container>
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <InputLabel><b>Enter Unmanned Systems:</b></InputLabel>
                <Grid container>
                    <Grid item xs={6} md={6} lg={6}>
                        <FormControl fullWidth>
                            <Select
                                value={selectedValue}
                                onChange={handleSelectionChange}
                                displayEmpty
                            >
                                <MenuItem  value="" disabled>Select to add</MenuItem >
                                {options.map((option, index) => (
                                    <MenuItem  key={index} value={option.name}>{option.name}</MenuItem >
                                ))}
                            </Select>
                            <FormHelperText>Switch option to add more than one unmanned systems</FormHelperText>
                        </FormControl>


                        <div>
                            <br/>
                            <InputLabel>System info:</InputLabel>
                            <List>
                                {selectedUAVs.map((uav, index) => (
                                    <ListItem
                                        key={index}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => removeUAV(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText>
                                            {`Name: ${uav.name}, Range: ${uav.range}, Endurance: ${uav.endurance} `}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </div>

                        {/*<Button variant="contained" onClick={handleSubmit}>UPLOAD DATA</Button>*/}
                    </Grid>

                    {/* //Displaying the API response
                    <Grid item xs={6} md={6} lg={6} px={3}>
                        <InputLabel>API Response:</InputLabel>
                        <pre>{apiResponse}</pre>

                    </Grid>*/}
                </Grid>
            </Box>
        </Container>
    );
};

export default UnmannedSystems;
