import React, { useState, useEffect } from 'react';
import { Map } from './Map'; // Assuming you've the Map component defined as above
import { Select, MenuItem, FormControl, Box } from '@mui/material';

const Output = () => {
  const [minimization, setMinimization] = useState('minimize1');
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    fetchModelData(minimization).then(data => {
      setMapData(data);
    });
  }, [minimization]);

  const handleChange = (event) => {
    setMinimization(event.target.value);
  };

  return (
      <Box display="flex" flexDirection="row" width="100%">
        <Box width="30%" p={2}>
          <FormControl fullWidth>
            <Select
                value={minimization}
                onChange={handleChange}
            >
              <MenuItem value="minimize1">Minimize 1</MenuItem>
              <MenuItem value="minimize2">Minimize 2</MenuItem>
              <MenuItem value="minimize3">Minimize 3</MenuItem>
            </Select>
          </FormControl>
          {/* Display drone info and coverage percentage here */}
        </Box>
        <Box width="70%">
          <Map coordData={mapData} />
        </Box>
      </Box>
  );
};

export default Output;
