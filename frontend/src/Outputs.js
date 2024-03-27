import React, { useState, useEffect } from 'react';
import ShowMap from './ShowMap';
import { Select, MenuItem, FormControl, Box, Typography, CssBaseline, Container, Toolbar, AppBar  } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Outputs = ({ coordData}) => {
  const [minimization, setMinimization] = useState('minimize1');
  const [mapData, setMapData] = useState([]);
  const [droneData, setDroneData] = useState({});
  const location = useLocation();

  const fetchModelData = async (minimizationOption) => {
    const mockData = {
      minimize1: "minNumberOfDrones",
      minimize2: "maxCoverage",
      minimize3: "maxTime",
    };

    const outputData = {
      minNumberOfDrones: {
        coverageTime: "4",
        coverageSize: "15",
        totalNumberOfDrones: 1,
        drones: [
          {
            name: "drone1",
            endurance: "4",
            speed: "50",
            coverageSize: "15",
            numberOfDrones: 1
          }
        ]
      },
      maxCoverage: {
        coverageTime: "6",
        coverageSize: "20",
        totalNumberOfDrones: 5,
        drones: [
          {
            name: "drone2",
            endurance: "6",
            speed: "40",
            coverageSize: "15",
            numberOfDrones: 2
          },
          {
            name: "drone3",
            endurance: "5",
            speed: "45",
            coverageSize: "5",
            numberOfDrones: 3
          }
        ]
      },
      maxTime: {
        coverageTime: "8",
        coverageSize: "10",
        totalNumberOfDrones: 4,
        drones: [
          {
            name: "drone4",
            endurance: "8",
            speed: "35",
            coverageSize: "10",
            numberOfDrones: 2
          },
          {
            name: "drone5",
            endurance: "8",
            speed: "35",
            coverageSize: "10",
            numberOfDrones: 2
          }
        ]
      },
      userInput: {
        minCoverage: "80",
        coverageTime: "8",
        coverageArea: "20"
      }
    };

    return outputData[mockData[minimizationOption]];
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(coordData);

    fetchModelData(minimization).then(data => {
      setMapData(data);
    });
  }, [minimization, location.search]);

  const handleChange = (event) => {
    setMinimization(event.target.value);
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

              <Box display="flex" flexDirection="row" width="100%">
                <Box width="30%" p={2}>
                  <FormControl fullWidth>
                    <Select value={minimization} onChange={handleChange}>
                      <MenuItem value="minimize1">Minimize 1</MenuItem>
                      <MenuItem value="minimize2">Minimize 2</MenuItem>
                      <MenuItem value="minimize3">Minimize 3</MenuItem>
                    </Select>
                  </FormControl>

                  {droneData.drones && droneData.drones.map((drone, index) => (
                      <Box key={index} mt={2}>
                        <Typography variant="h6">{drone.name}</Typography>
                        <Typography>Endurance: {drone.endurance} hours</Typography>
                        <Typography>Speed: {drone.speed} km/h</Typography>
                        <Typography>Coverage Size: {drone.coverageSize} km²</Typography>
                        <Typography>Number of Drones: {drone.numberOfDrones}</Typography>
                      </Box>
                  ))}
                </Box>
                <Box width="70%">
                  <ShowMap coordData={coordData} />
                </Box>
              </Box>

            </Container>
          </Box>
        </Box>
      </div>
  );
};

export default Outputs;
