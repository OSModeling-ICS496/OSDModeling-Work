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
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './listItems';
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
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('coordData'));
    if (data) {
      setMapData(data);
      localStorage.removeItem('coordData');
    }
  }, []);

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
    fetchModelData(minimization).then(data => {
      setDroneData(data);
    });
  }, [minimization]);

  const handleChange = (event) => {
    setMinimization(event.target.value);
  };

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
              {mainListItems }
              <Divider sx={{ my: 1 }} />
              {secondaryListItems  }
            </List>
          </Drawer>

          <Grid container spacing={2} sx={{ mt: 12, mb: 4}}>
            <Grid item xs={3}>
              <Container sx={{ ml: 9}}>
                <FormControl>
                  <Select value={minimization} onChange={handleChange}>
                    <MenuItem value="minimize1">Min Number Of Drones</MenuItem>
                    <MenuItem value="minimize2">Max Coverage</MenuItem>
                    <MenuItem value="minimize3">Max Time</MenuItem>
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
              </Container>
            </Grid>

            <Grid item xs={8}>
              <ShowMap coordData={mapData}/>
            </Grid>
          </Grid>
        </Box>
      </div>
  );
};

export default Outputs;
