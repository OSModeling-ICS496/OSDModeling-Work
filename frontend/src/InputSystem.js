import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './SlidePanel.css';
import "react-sliding-pane/dist/react-sliding-pane.css";

const InputSystem = () => {
    const [options, setOptions] = useState([]);
    const [selectedUAVs, setSelectedUAVs] = useState([]); // Now using an array to store multiple selections

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
        setSelectedUAVs([...selectedUAVs, uavDetails]); // Add the selected UAV to the array
    };

    // const handleSubmit = async () => {
    //     // Prepare content for all selected UAVs
    //     const content = selectedUAVs.map(uav => `${uav.name}, ${uav.range}, ${uav.endurance}`).join('\n');
    //     const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'selectedUAVs.csv'; // Naming for multiple UAVs
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);

    //     /** run python script:
    //      const response = await fetch('http://localhost:5000/run-script', {
    //      method: 'POST',
    //      headers: {
    //      'Content-Type': 'application/json',
    //      },
    //      body: JSON.stringify(content),
    //      });

    //      const responseData = await response.json();
    //      console.log(responseData.output);
    //      **/
    // };

    const handleSubmit = async () => {
        // Prepare content for all selected UAVs
        const content = selectedUAVs.map(uav => ({
            name: uav.name,
            range: uav.range,
            endurance: uav.endurance
        }));
    
        try {
            const response = await fetch('https://96k2qcbm5k.execute-api.us-east-1.amazonaws.com/default/Test1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ selectedUAVs: content }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);

            setApiResponse(JSON.stringify(responseData, null, 2)); 
        } catch (error) {
            console.error('Error calling API:', error);
            setApiResponse("Error calling API: " + error.message);
        }
    };
    
    const [apiResponse, setApiResponse] = useState("");


    // Function to remove a UAV from the selection
    const removeUAV = (indexToRemove) => {
        setSelectedUAVs(selectedUAVs.filter((_, index) => index !== indexToRemove));
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
                    <ul>
                        {selectedUAVs.map((uav, index) => (
                            <li key={index}>
                                {`Name: ${uav.name}, Range: ${uav.range}, Endurance: ${uav.endurance} `}
                                <button onClick={() => removeUAV(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={handleSubmit}>Submit and Display API Response</button>
            </div>

            <div>
                <h3>API Response:</h3>
                <pre>{apiResponse}</pre> {/* Displaying the API response */}
            </div>
        </div>
    );
};

export default InputSystem;
