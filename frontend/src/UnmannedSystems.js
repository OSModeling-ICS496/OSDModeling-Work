import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Box, MenuItem, FormControl, Select, Grid, FormHelperText, InputLabel, List, ListItem, ListItemText, IconButton, TextField, Button, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UnmannedSystems = ({ onUnmannedSystemsChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedUAVs, setSelectedUAVs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({ range: '', endurance: '' });
  const [name, setName] = useState("");
  const [range, setRange] = useState("");
  const [endurance, setEndurance] = useState("");

  useEffect(() => {
    const fetchOptions = () => {
      Papa.parse('/data/UAV_specs_-_Sheet1.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const parsedOptions = result.data.map(item => ({
            name: item['Name(UAV)'],
            range: item['Range(in km)'],
            endurance: item['Endurance(in hours)']
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

    // Check if a UAV with the same name, range, and endurance already exists
    const duplicateUAV = selectedUAVs.find(uav => uav.name === uavDetails.name && uav.range === uavDetails.range && uav.endurance === uavDetails.endurance);

    if (!duplicateUAV) {
      setSelectedUAVs([...selectedUAVs, uavDetails]);
    }

    setSelectedValue("");
  };


  const handleAddCustomUAV = () => {
    setSelectedUAVs([...selectedUAVs, { name, range, endurance }]);
    setName("");
    setRange("");
    setEndurance("");
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
        if (!result.data.every(item => 'Name' in item && 'Range' in item && 'Endurance' in item)) {
          alert('CSV file should contain Name, Range, and Endurance columns.');
          return;
        }

        // CSV structure is valid, add data to selectedUAVs state
        const newData = result.data.map(item => ({
          name: item['Name'],
          range: item['Range'],
          endurance: item['Endurance']
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
                  value={selectedValue}
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
          <Grid item md={4}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <TextField
                label="Range (in km)"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <TextField
                label="Endurance (in hours)"
                value={endurance}
                onChange={(e) => setEndurance(e.target.value)}
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
                        <IconButton onClick={() => handleSave(index)}>
                          <SaveIcon />
                        </IconButton>
                      </>
                  ) : (
                      <>
                        <ListItemText>
                          {`Name: ${uav.name}, Range: ${uav.range}, Endurance: ${uav.endurance}`}
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
