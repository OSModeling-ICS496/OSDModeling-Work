import React, { useState, useEffect } from 'react';
import ShowMap from './ShowMap';
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Toolbar,
  Container,
  Grid,
  IconButton, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import {inputListItems, outputListItems} from './DataManagement';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

const Outputs = () => {
  const [minimization, setMinimization] = useState('minimize1');
  const [mapData, setMapData] = useState([]);
  const [droneData, setDroneData] = useState({});
  const [apiResponseData, setApiResponseData] = useState({});
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Fetching map data
    const data = JSON.parse(localStorage.getItem('inputData'));
    if (data) {
      setMapData(data.coordData);
    }

    // Fetching API response data
    const apiData = JSON.parse(localStorage.getItem('outputData'));
    if (apiData) {
      setApiResponseData(apiData);
    }
  }, []);

  const fetchModelData = async (minimizationOption) => {
    const minimizationMapping = {
      minimize1: "Objective 3 - Minimize Drones Used",
      minimize2: "Objective 1 - Maximize Coverage Area",
      minimize3: "Objective 2 - Maximize duration at Point B",
    };

    const apiData = apiResponseData;

    if (!apiData) {
      console.error('No API data found');
      return {};
    }

    const relevantData = apiData[minimizationMapping[minimizationOption]];

    if (!relevantData) {
      console.error('Relevant data not found for the minimization option:', minimizationOption);
      return {};
    }

    return relevantData;
  };

  const handleChange = (event) => {
    setMinimization(event.target.value);
  };

  useEffect(() => {
    fetchModelData(minimization).then(data => {
      setDroneData(data);
    });
  }, [minimization]);

  return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: '24px', }}>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1,
                  display: 'absolute'}}
              >
                Results
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {inputListItems }
              <Divider sx={{ my: 10 }} />
              {outputListItems  }
            </List>
          </Drawer>

          <Grid container spacing={2} sx={{ mt: 12, mb: 4 }}>
            <Grid item xs={12} sm={4} md={3}>
              <Container>
                <FormControl fullWidth>
                  <Select value={minimization} onChange={handleChange}>
                    <MenuItem value="minimize1">Minimize Drones Used</MenuItem>
                    <MenuItem value="minimize2">Maximize Coverage Area</MenuItem>
                    <MenuItem value="minimize3">Maximize duration at Point B</MenuItem>
                  </Select>
                </FormControl>
                {droneData["Message"] && <Typography variant="h5" color="red" sx={{mt: 4}}>{droneData["Message"]}</Typography>}

                {droneData["Combination"] && droneData["Combination"].map((drone, index) => (
                    <Box key={index} mt={2}>
                      <Typography variant="h6">{drone.name}</Typography>
                      <Typography>Coverage: {drone.coverage} km²</Typography>
                      <Typography>Endurance: {drone.endurance} hours</Typography>
                      <Typography>Speed: {drone.speed} km/hour</Typography>
                    </Box>
                ))}
              </Container>

              <Container sx={{ mt: 8 }}>
                {droneData["Total Coverage"] && <Typography>Total Coverage: {droneData["Total Coverage"]} {droneData["Unit"]}</Typography>}
                {droneData["Max duration at Point B"] && <Typography>Max duration at Point B: {droneData["Max duration at Point B"].toFixed(2)} {droneData["Unit"]}</Typography>}
                {droneData["Drones Used"] && <Typography>Drones Used: {droneData["Drones Used"]}</Typography>}
              </Container>
            </Grid>

            <Grid item xs={12} sm={8} md={8.5}>
              <ShowMap coordData={mapData} />
            </Grid>
          </Grid>

        </Box>
      </div>
  );
};

export default Outputs;
