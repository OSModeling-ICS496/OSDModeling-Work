import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    Alert, Grid
} from "@mui/material";
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import {inputListItems, outputListItems} from './DataManagement';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import MapIcon from '@mui/icons-material/Map';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CoordinateAndParameters from "./CoordinateAndParameters";
import UnmannedSystems from "./UnmannedSystems";
import ShowInputs from "./ShowInputs";
import ShowMap from "./ShowMap";

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

const Inputs = () => {
    const [coordData, setCoordData] = useState({ baseCoord: {}, reconCoord: {} });
    const [minCoverage, setMinCoverage] = useState('');
    const [uavData, setUavData] = useState({});
    const [durationData, setDurationData] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [open, setOpen] = React.useState(true);
    // const [apiResponse, setApiResponse] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    const handleCoordinateChange = (data) => {
        setCoordData(data);
    };

    const handleCoverageChange = (coverage) => {
        setMinCoverage(coverage);
    };

    const handleUnmannedSystemsChange = (data) => {
        setUavData(data);
    };

    const handledurationChange = (newduration) => {
        setDurationData(newduration); 
    };

    const integrateData = () => {
        return {
            coordData,
            minCoverage,
            uavData,
            durationData
        };
    };

    console.log(integrateData())
    const handleRunModel = async () => {
        const jsonData = integrateData();
        console.log(jsonData);
        let isError = false;

        try {
            // New API link here
            const response = await fetch('https://96k2qcbm5k.execute-api.us-east-1.amazonaws.com/default/Test1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({jsonData}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            // setApiResponse(JSON.stringify(responseData, null, 2));


            // Store coordData in local storage
            localStorage.setItem('inputData', JSON.stringify(jsonData));

            // Store the response in local storage
            localStorage.setItem('outputData', JSON.stringify(responseData));
        } catch (error) {
            console.error('Error calling API:', error);
            // setApiResponse("Error calling API: " + error.message);
            setError("Error calling API: " + error.message);
            setShowError(true);
            isError = true;
        }

        if (!isError) {
            const url = window.location.origin + '/outputs';
            window.open(url, '_blank');
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const storedInputData = localStorage.getItem('inputData');
            if (storedInputData) {
                const parsedInputData = JSON.parse(storedInputData);
                if (parsedInputData) {
                    if (parsedInputData.coordData) setCoordData(parsedInputData.coordData);
                    if (parsedInputData.minCoverage) setMinCoverage(parsedInputData.minCoverage);
                    if (parsedInputData.uavData) setUavData(parsedInputData.uavData);
                    if (parsedInputData.durationData) setDurationData(parsedInputData.durationData);
                }
            }
        };
    }, []);

    return (
        <div>
          <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{pr: '24px',}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Inputs
                    </Typography>
                    <Tooltip title={showMap ? 'Hide Map' : 'Show Map'}>
                        <IconButton color="gray" onClick={toggleMap} sx={{transform: 'scale(1.2)', mr: '5px'}}>
                            <MapIcon/>
                        </IconButton>
                    </Tooltip>


                    <Button variant="contained" color="success" onClick={handleRunModel}>Run Model</Button>

                </Toolbar>
                {
                    showMap &&
                    (
                        <Grid item xs={12} sm={8} md={8.5}>
                            <ShowMap coordData={coordData} />
                        </Grid>
                    )
                }

                {
                    showError &&
                    (
                        <Alert variant="filled" severity="error" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                            {error}
                        </Alert>
                    )
                }
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
                {inputListItems}
                <Divider sx={{ my: 10 }} />
                {outputListItems}
              </List>
            </Drawer>

              <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>

                  <Container>
                      <Accordion id="inputs">
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                          >
                              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                  Modify Model
                              </Typography>
                              <Typography sx={{color: 'text.secondary'}}>Add/modify inputs to run model</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Box
                                  component="div"
                                  sx={{
                                      '& > :not(style)': { m: 1 },
                                  }}
                                  noValidate
                                  autoComplete="off"
                              >
                                  <Card>
                                      <CardContent>
                                          {/* CoordinateAndParameters */}
                                          <CoordinateAndParameters
                                              onCoordinateChange={handleCoordinateChange}
                                              onCoverageChange={handleCoverageChange}
                                              ondurationChange={handledurationChange}
                                          />
                                          {/* Unmanned Systems */}
                                          <UnmannedSystems onUnmannedSystemsChange={handleUnmannedSystemsChange} />
                                      </CardContent>
                                  </Card>
                              </Box>
                          </AccordionDetails>
                      </Accordion>

                      {/* ShowInputs Component */}
                      <ShowInputs
                          uavData={uavData}
                          minCoverage={minCoverage}
                          coordData={coordData}
                          durationData={durationData}
                      />
                  </Container>

              </Container>
          </Box>
        </div>
    );
};

export default Inputs;