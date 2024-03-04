import React, {useEffect, useState} from 'react';
import {OutlinedInput, Container, Box, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';


const TimeAndCoverage = ({ onTimeChange, onCoverageChange }) => {
    const [time, setTime] = useState('');
    const [coverage, setCoverage] = useState('');

    useEffect(() => {
        onTimeChange(time);
        onCoverageChange(coverage);
    }, [time, coverage]);

    return (
        <Container >
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <InputLabel><b>Mission Time:</b></InputLabel>
                <FormControl>
                    <OutlinedInput
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Time in minutes"
                        required
                        endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                    />
                    <FormHelperText>Edit to modify</FormHelperText>
                </FormControl>

                <InputLabel><b>Area Coverage:</b></InputLabel>
                <FormControl>
                    <OutlinedInput
                        type="number"
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        placeholder="Area in square miles"
                        required
                        endAdornment={<InputAdornment position="end">miles</InputAdornment>}
                    />
                    <FormHelperText>Edit to modify</FormHelperText>
                </FormControl>
            </Box>
        </Container>
    );
};

export default TimeAndCoverage;