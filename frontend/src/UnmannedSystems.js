import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Box, MenuItem, FormControl, Select, Grid, FormHelperText, InputLabel, List, ListItem, ListItemText, IconButton, TextField, Button, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UnmannedSystems = ({ onUnmannedSystemsChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedUAVs, setSelectedUAVs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({ range: '', endurance: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempUAV, setTempUAV] = useState({ name: '', range: '', endurance: '', speed: '' });
  const [name, setName] = useState("");
  const [range, setRange] = useState("");
  const [endurance, setEndurance] = useState("");
  const [speed, setSpeed] = useState("");

  useEffect(() => {
    const fetchOptions = () => {
      Papa.parse('/data/UAV_specs_-_Sheet1.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const parsedOptions = result.data.map(item => ({
            name: item['Name(UAV)'],
            range: item['Range(in km)'],
            endurance: item['Endurance(in hours)'],
            speed: item['Speed (in hours/km)']
          })).filter(uav => uav.name);
          setOptions(parsedOptions);
        }
      });
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    onUnmannedSystemsChange(selectedUAVs);
  }, [selectedUAVs]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValues({
      range: selectedUAVs[index].range,
      endurance: selectedUAVs[index].endurance,
      speed: selectedUAVs[index].speed,
    });
  };

  const handleSave = (index) => {
    const updatedUAVs = [...selectedUAVs];
    updatedUAVs[index] = { ...updatedUAVs[index], ...editValues };
    setSelectedUAVs(updatedUAVs);
    setEditIndex(null);
  };

  const handleChangeEdit = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectionChange = (event) => {
    const selectedName = event.target.value;
    const uavDetails = options.find(option => option.name === selectedName);
    // Initialize tempUAV with existing UAV details
    setTempUAV({ ...uavDetails, range: uavDetails.range || '', endurance: uavDetails.endurance || '', speed: uavDetails.speed || '' });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = () => {
    const updatedUAV = {
      ...tempUAV,
      range: tempUAV.range || tempUAV.range,
      endurance: tempUAV.endurance || tempUAV.endurance,
      speed: tempUAV.speed || tempUAV.speed,
    };

    if (updatedUAV.name) {
      setSelectedUAVs([...selectedUAVs, updatedUAV]);
    }
    setDialogOpen(false);
  };

  const handleInputChange = (e, field) => {
    setTempUAV({ ...tempUAV, [field]: e.target.value });
  };

  const handleAddCustomUAV = () => {
    setSelectedUAVs([...selectedUAVs, { name, range, endurance, speed }]);
    setName("");
    setRange("");
    setEndurance("");
    setSpeed("");
  };

  const removeUAV = (indexToRemove) => {
    setSelectedUAVs(selectedUAVs.filter((_, index) => index !== indexToRemove));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      // No file selected
      return;
    }
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        // Validate CSV structure
        if (!result.data.every(item => 'Name' in item && 'Range' in item && 'Endurance' in item && 'Speed' in item)) {
          alert('CSV file should contain Name, Range, Endurance, and Speed columns.');
          return;
        }

        // CSV structure is valid, add data to selectedUAVs state
        const newData = result.data.map(item => ({
          name: item['Name'],
          range: item['Range'],
          endurance: item['Endurance'],
          speed: item['Speed']
        }));
        setSelectedUAVs([...selectedUAVs, ...newData]);
      },
      error: (error) => {
        alert('Error parsing CSV file: ' + error.message);
      }
    });
  };

  const handleAddCSVData = () => {
    const fileInput = document.getElementById('csvFileInput');
    if (fileInput) {
      fileInput.click();
    }
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
        <InputLabel><b>Enter Unmanned Systems:</b></InputLabel>

        <Grid container spacing={4}>
          <Grid item md={6}>
            <FormControl fullWidth>
              <Select
                  value=""
                  onChange={handleSelectionChange}
                  displayEmpty
              >
                <MenuItem value="" disabled>Select to add</MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Switch option to add more than one unmanned systems</FormHelperText>
            </FormControl>
          </Grid>

          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Add UAV Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the details for the selected UAV.
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="range"
                  label="Range (in km)"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={tempUAV.range}
                  onChange={(e) => handleInputChange(e, 'range')}
              />
              <TextField
                  margin="dense"
                  id="endurance"
                  label="Endurance (in hours)"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={tempUAV.endurance}
                  onChange={(e) => handleInputChange(e, 'endurance')}
              />
              <TextField
                  margin="dense"
                  id="speed"
                  label="Speed (in km/h)"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={tempUAV.speed}
                  onChange={(e) => handleInputChange(e, 'speed')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDialogSave}>Save</Button>
            </DialogActions>
          </Dialog>

          <Grid item md={1}>
            <h3>OR</h3>
          </Grid>

          <Grid item md={5}>
            <InputLabel>Upload CSV:</InputLabel>
            <Input id="csvFileInput" type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />
            <Button variant="contained" onClick={handleAddCSVData}>Add CSV Data</Button>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={3}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={3}>
            <TextField
                label="Range (in km)"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={3}>
            <TextField
                label="Endurance (in hours)"
                value={endurance}
                onChange={(e) => setEndurance(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={3}>
            <TextField
                label="Speed (in hours/km)"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <Button variant="contained" onClick={handleAddCustomUAV}>Add Custom UAV</Button>
          </Grid>
        </Grid>

        <Container>
          <InputLabel>System info:</InputLabel>
          <List>
            {selectedUAVs.map((uav, index) => (
                <ListItem key={index}>
                  {editIndex === index ? (
                      <>
                        <TextField
                            label="Range (in km)"
                            value={editValues.range}
                            onChange={(e) => handleChangeEdit('range', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            label="Endurance (in hours)"
                            value={editValues.endurance}
                            onChange={(e) => handleChangeEdit('endurance', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            label="Speed (in hours/km)"
                            value={editValues.speed}
                            onChange={(e) => handleChangeEdit('speed', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <IconButton onClick={() => handleSave(index)}>
                          <SaveIcon />
                        </IconButton>
                      </>
                  ) : (
                      <>
                        <ListItemText>
                          {`Name: ${uav.name}, Range: ${uav.range}, Endurance: ${uav.endurance}, Speed: ${uav.speed}`}
                        </ListItemText>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeUAV(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                  )}
                </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </Container>
  );
};

export default UnmannedSystems;
