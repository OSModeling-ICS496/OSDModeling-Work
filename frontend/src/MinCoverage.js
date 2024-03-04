import React, {useEffect, useState} from 'react';
import {OutlinedInput, Container, Box, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';


const MinCoverage = ({ onCoverageChange }) => {
    const [coverage, setCoverage] = useState('');

    useEffect(() => {
        onCoverageChange(coverage);
    }, [coverage]);

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
                <InputLabel><b>Minimum Area Coverage:</b></InputLabel>
                <FormControl>
                    <OutlinedInput
                        type="number"
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        required
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                    <FormHelperText>Edit to modify</FormHelperText>
                </FormControl>
            </Box>
        </Container>
    );
};

export default MinCoverage;