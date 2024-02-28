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

    };

    return (
        <div>
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

                <button onClick={handleSubmit}>Run Result</button>
            </div>

            <div>
                some lon & lat info
            </div>
        </div>
    );

};

export default SlidePanel;
