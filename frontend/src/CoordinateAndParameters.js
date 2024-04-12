import React, { useState, useEffect } from 'react';
import {
  OutlinedInput, Box, Container, InputLabel, InputAdornment, Grid, FormControl, FormHelperText,
} from "@mui/material";

const CoordinateAndParameters = ({ onCoordinateChange, onCoverageChange,ondurationChange }) => {
  const [baseCoord, setBaseCoord] = useState({ lat: '', long: '' });
  const [reconCoord, setReconCoord] = useState({ lat: '', long: '' });
  const [size, setSize] = useState('');
  const [duration, setDuration] = useState('');
  const [coverage, setCoverage] = useState('');

  useEffect(() => {
    onCoordinateChange({ baseCoord, reconCoord, size});
    onCoverageChange(coverage);
    ondurationChange(duration);
  }, [baseCoord, reconCoord, size, duration, coverage, onCoordinateChange, onCoverageChange, ondurationChange]);

  useEffect(() => {
    const storedInputData = localStorage.getItem('inputData');
    if (storedInputData) {
      const parsedInputData = JSON.parse(storedInputData);
      if (parsedInputData) {
        if (parsedInputData.coordData){
          setBaseCoord(parsedInputData.coordData.baseCoord);
          setReconCoord(parsedInputData.coordData.reconCoord);
        }
        if (parsedInputData.minCoverage) setCoverage(parsedInputData.minCoverage);
        if (parsedInputData.durationData) setDuration(parsedInputData.durationData);
        if (parsedInputData.coordData.size) setSize(parsedInputData.coordData.size);
      }
    }
  }, []);

  return (
    <Container>
      <Box sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
        <InputLabel><b>Base Location Coordinates:</b></InputLabel>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Latitude"
                required
                value={baseCoord.lat}
                onChange={(e) => setBaseCoord({ ...baseCoord, lat: e.target.value })}
                endAdornment={<InputAdornment position="end">N°</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Longitude"
                required
                value={baseCoord.long}
                onChange={(e) => setBaseCoord({ ...baseCoord, long: e.target.value })}
                endAdornment={<InputAdornment position="end">E°</InputAdornment>}
              />
            </FormControl>
          </Grid>
        </Grid>

        <InputLabel><b>Recon Location Coordinates:</b></InputLabel>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Latitude"
                required
                value={reconCoord.lat}
                onChange={(e) => setReconCoord({ ...reconCoord, lat: e.target.value })}
                endAdornment={<InputAdornment position="end">N°</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Longitude"
                required
                value={reconCoord.long}
                onChange={(e) => setReconCoord({ ...reconCoord, long: e.target.value })}
                endAdornment={<InputAdornment position="end">E°</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Size"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                endAdornment={<InputAdornment position="end">km²</InputAdornment>}
              />
            </FormControl>
          </Grid>
        </Grid>

        <InputLabel><b>Optimization Parameters:</b></InputLabel>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <OutlinedInput
                placeholder="Duration"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                endAdornment={<InputAdornment position="end">Hours</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput
                type="number"
                placeholder="Minimum Coverage"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
                required
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
              <FormHelperText>Minimum coverage for Recon Location</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CoordinateAndParameters;