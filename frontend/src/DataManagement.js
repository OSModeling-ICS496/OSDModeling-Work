import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItem from "@mui/material/ListItem";

const saveInput = () => {
    const inputData = JSON.parse(localStorage.getItem('inputData'));
    if (!inputData || Object.keys(inputData).length === 0) {
        alert("No input data to save.");
        return;
    }

    const previewData = JSON.stringify(inputData, null, 2);
    const userConfirmed = window.confirm(`Do you want to save this input data?\nPreview:\n${previewData}`);

    if (userConfirmed) {
        const blob = new Blob([previewData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'inputData.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

const saveOutput = () => {
    const inputData = JSON.parse(localStorage.getItem('inputData'));
    const outputData = JSON.parse(localStorage.getItem('outputData'));

    if ((!inputData || Object.keys(inputData).length === 0) && (!outputData || Object.keys(outputData).length === 0)) {
        alert("No input or output data to save.");
        return;
    }

    // Combine input and output data into a single object
    const combinedData = {
        outputData,
        inputData
    };

    // Create a preview for the confirmation dialog
    const previewData = JSON.stringify(combinedData, null, 2);
    const userConfirmed = window.confirm(`Do you want to save this data?\nPreview:\n${previewData}`);

    if (userConfirmed) {
        const blob = new Blob([JSON.stringify(combinedData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'combinedData.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


const loadInput = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result);
                // Validate data structure
                if (data && data.coordData && data.minCoverage && Array.isArray(data.uavData) && data.durationData) {
                    localStorage.setItem('inputData', JSON.stringify(data));
                    alert("Input data loaded successfully.");
                    window.location.reload();
                } else {
                    alert("Invalid file structure.");
                }
            } catch (error) {
                alert("An error occurred while loading the file.");
            }
        };
        reader.readAsText(file);
    };

    fileInput.click();
};

const loadOutput = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            try {
                const combinedData = JSON.parse(e.target.result);

                if (combinedData && combinedData.inputData && combinedData.outputData) {
                    localStorage.setItem('inputData', JSON.stringify(combinedData.inputData));
                    localStorage.setItem('outputData', JSON.stringify(combinedData.outputData));
                    alert("Input and Output data loaded successfully.");
                    window.location.reload();
                } else {
                    alert("Invalid file structure.");
                }
            } catch (error) {
                alert("An error occurred while loading the file.");
            }
        };
        reader.readAsText(file);
    };

    fileInput.click();
};


const clearInputData = () => {
    localStorage.removeItem('inputData');
    alert('Input data cleared.');
    window.location.reload();
};

const clearOutputData = () => {
    localStorage.removeItem('inputData');
    localStorage.removeItem('outputData');
    alert('Output data cleared.');
    window.location.reload();
};

export const inputListItems = (
    <React.Fragment>
        <ListItem>
            <ListItemIcon>
                <InputIcon />
            </ListItemIcon>
            <ListItemText primary="Input Data" />
        </ListItem>

        <ListItemButton onClick={saveInput}>
            <ListItemIcon>
                <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Save data" />
        </ListItemButton>


        <ListItemButton onClick={loadInput}>
            <ListItemIcon>
                <UploadIcon />
            </ListItemIcon>
            <ListItemText primary="Load data" />
        </ListItemButton>

        <ListItemButton onClick={clearInputData}>
            <ListItemIcon>
                <CleaningServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Clear data" />
        </ListItemButton>

    </React.Fragment>
);

export const outputListItems = (
    <React.Fragment>
        <ListItem>
            <ListItemIcon>
                <OutputIcon />
            </ListItemIcon>
            <ListItemText primary="Output Data" />
        </ListItem>

        <ListItemButton onClick={saveOutput} >
            <ListItemIcon>
                <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Save data" />
        </ListItemButton>


        <ListItemButton onClick={loadOutput}>
            <ListItemIcon>
                <UploadIcon />
            </ListItemIcon>
            <ListItemText primary="Load data" />
        </ListItemButton>

        <ListItemButton onClick={clearOutputData}>
            <ListItemIcon>
                <CleaningServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Clear data" />
        </ListItemButton>

    </React.Fragment>
);