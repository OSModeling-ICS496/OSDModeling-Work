import React, { useState, useEffect } from 'react';
import { OutlinedInput, Box, Button, IconButton, Select, Container, MenuItem, InputLabel, InputAdornment, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Map from "./Map";

const Coordinate = ({ onCoordinateChange }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [newCoord, setNewCoord] = useState({ lat: '', lng: '', order: 1, size: '', time: '' });
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    onCoordinateChange(coordinates);
  }, [coordinates]);

  const handleAddCoordinate = () => {
    setCoordinates([...coordinates, { ...newCoord, order: coordinates.length + 1 }]);
    setNewCoord({ lat: '', lng: '', order: coordinates.length + 2, size: '', time: '' });
  };

  const handleRemoveCoordinate = (indexToRemove) => {
    const updatedCoordinates = coordinates.filter((_, index) => index !== indexToRemove)
        .map((coord, index) => ({ ...coord, order: index + 1 }));
    setCoordinates(updatedCoordinates);
  };

  const handleSort = (index, newOrder) => {
    let tempCoords = [...coordinates];
    tempCoords[index].order = parseInt(newOrder, 10);
    tempCoords.sort((a, b) => a.order - b.order);
    setCoordinates(tempCoords);
  };

  const handleSizeChange = (index, newSize) => {
    let tempCoords = [...coordinates];
    tempCoords[index].size = newSize;
    setCoordinates(tempCoords);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
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
          <InputLabel><b>Enter Coordinates and Size:</b></InputLabel>
          <Grid container>
            <Grid xs={3} md={3} lg={3}>
              <OutlinedInput
                  id="Latitude"
                  placeholder="Latitude"
                  required
                  variant="standard"
                  value={newCoord.lat}
                  onChange={(e) => setNewCoord({...newCoord, lat: e.target.value})}
                  endAdornment={<InputAdornment position="end">N°</InputAdornment>}
              />
            </Grid>

            <Grid xs={3} md={3} lg={3}>
              <OutlinedInput
                  id="Longitude"
                  placeholder="Longitude"
                  required
                  variant="standard"
                  value={newCoord.lng}
                  onChange={(e) => setNewCoord({...newCoord, lng: e.target.value})}
                  endAdornment={<InputAdornment position="end">W°</InputAdornment>}
              />
            </Grid>

            <Grid xs={3} md={3} lg={3}>
              <OutlinedInput
                  id="Size"
                  placeholder="Size"
                  required
                  variant="outlined"
                  value={newCoord.size}
                  onChange={(e) => setNewCoord({...newCoord, size: e.target.value})}
                  endAdornment={<InputAdornment position="end">km²</InputAdornment>}
              />
            </Grid>

            <Grid xs={3} md={3} lg={3}>
              <OutlinedInput
                  id="Time"
                  placeholder="Time"
                  required
                  variant="outlined"
                  value={newCoord.time}
                  onChange={(e) => setNewCoord({...newCoord, time: e.target.value})}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
              />
            </Grid>
          </Grid>

          <Button variant="contained" onClick={toggleMap}>{showMap ? 'Hide Map' : 'Show Map'}</Button>
          <Button variant="contained" onClick={handleAddCoordinate}>Add Point</Button>
          <InputLabel>Coordinate Orders and Sizes:</InputLabel>
          {coordinates.map((coord, index) => (
              <Box
                  component="div"
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                  key={index}
              >
                {index + 1}. lat: {coord.lat} N, lng: {coord.lng} W, size: {coord.size} km²
                <Select
                    size="small"
                    displayEmpty
                    value={coord.order}
                    onChange={(e) => handleSort(index, e.target.value)}>
                  {Array.from({length: coordinates.length}, (_, i) => i + 1).map((order) => (
                      <MenuItem key={order} value={order}>
                        {order}
                      </MenuItem>
                  ))}
                </Select>
                <IconButton aria-label="delete" onClick={() => handleRemoveCoordinate(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
          ))}
        </Box>
        {showMap && (<Map coordData={coordinates} />)}
      </Container>
  );
};

export default Coordinate;
