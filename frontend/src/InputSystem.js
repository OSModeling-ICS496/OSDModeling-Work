import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './SlidePanel.css';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidePanel = () => {
    const [options, setOptions] = useState([]);
    const [selectedUAV, setSelectedUAV] = useState({});

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

    const handleSelectionChange = (event) => {
        const selectedName = event.target.value;
        const uavDetails = options.find(option => option.name === selectedName);
        setSelectedUAV(uavDetails);
    };

    const handleSubmit = async () => {
        const content = `${selectedUAV.name}, ${selectedUAV.range}, ${selectedUAV.endurance}`;
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'selectedUAV.csv'; // or 'selectedUAV.txt' for a text file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        /** run python script:
        const response = await fetch('http://localhost:5000/run-script', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        const responseData = await response.json();
        console.log(responseData.output);
         **/
    };


    return (
        <div>
            <h3>Enter Systems:</h3>
            <div>
                <span><b>Unmanned systems:</b> <br/></span>
                <select defaultValue="" onChange={handleSelectionChange}>
                    <option value="" disabled>Select your option</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>{option.name}</option>
                    ))}
                </select>

                <div>
                    <br/>
                    <span><b>System Info:</b> <br/></span>
                    {selectedUAV && (
                        <span>Range - {selectedUAV.range}, Endurance - {selectedUAV.endurance}</span>
                    )}
                </div>

                <button onClick={handleSubmit}>Download Info and Run Script</button>
            </div>

            <div>
                some basic info generate from python script
            </div>
        </div>
    );
};

export default SlidePanel;
