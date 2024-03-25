import React, { useState, useEffect } from 'react';
import {
  OutlinedInput,Box,Button,Container,InputLabel,InputAdornment,Grid,FormControl,
} from "@mui/material";
import Map from "./Map";

const CoordinateSystem = ({ onCoordinateChange, onCoverageChange,onTimeChange }) => {
  const [baseCoord, setBaseCoord] = useState({ lat: '', lng: '' });
  const [reconCoord, setReconCoord] = useState({ lat: '', lng: '' });
  const [size, setSize] = useState('');
  const [time, setTime] = useState('');
  const [coverage, setCoverage] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    onCoordinateChange({ baseCoord, reconCoord, size});
    onCoverageChange(coverage);
    onTimeChange(time)
  }, [baseCoord, reconCoord, size, time, coverage]);

  const integrateData = () => {
    const integratedData = {
      baseCoord,
      reconCoord,
      size,
    };
    return integratedData;
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

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
                value={baseCoord.lng}
                onChange={(e) => setBaseCoord({ ...baseCoord, lng: e.target.value })}
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
                value={reconCoord.lng}
                onChange={(e) => setReconCoord({ ...reconCoord, lng: e.target.value })}
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
                placeholder="Time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" onClick={toggleMap}>{showMap ? 'Hide Map' : 'Show Map'}</Button>
      </Box>
      {showMap && (<Map coordData={integrateData()} />)}
    </Container>
  );
};

export default CoordinateSystem;