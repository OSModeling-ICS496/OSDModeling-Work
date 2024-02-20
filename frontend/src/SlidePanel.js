import React, { useState, useEffect } from 'react';
import SlidingPane from "react-sliding-pane";
import Papa from 'papaparse';
import './SlidePanel.css';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidePanel = () => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        // Function to fetch and parse CSV data
        const fetchOptions = () => {
            Papa.parse('/data/unmanned_systems_data.csv', {
                download: true,
                header: true, // Assumes the first row of your CSV contains column headers
                complete: (result) => {
                    // Assuming CSV has a column named 'systemName'
                    const parsedOptions = result.data.map(item => item.systemName).filter(name => name);
                    setOptions(parsedOptions);
                }
            });
        };

        fetchOptions();
    }, []);

    const handleSelectionChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = async () => {

    };

    return (
        <div>
            {!isPaneOpen && (
                <button className='sidebar-toggle' onClick={() => setIsPaneOpen(true)}>
                    <span>>></span>
                </button>
            )}
            <SlidingPane
                closeIcon={<div>X</div>}
                isOpen={isPaneOpen}
                title="Title"
                from="left"
                width="24em"
                onRequestClose={() => setIsPaneOpen(false)}>
                <div>
                    Unmanned systems:
                    <select defaultValue="" onChange={handleSelectionChange}>
                        <option value="" disabled>Select your option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>

                    <div>
                        <p>some info:</p>
                    </div>

                    <button onClick={handleSubmit}>Run Result</button>
                </div>

                <div>
                    some lon & lat info
                </div>
            </SlidingPane>
        </div>
    );
};

export default SlidePanel;
