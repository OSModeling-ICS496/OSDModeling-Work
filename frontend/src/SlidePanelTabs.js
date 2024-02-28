import React, { useState } from 'react';
import './SlidePanelTabs.css';
import Home from "./Home";
import Coordinate from "./Coordinate";
import InputSystem from "./InputSystem";
import ResultsAnalysis from "./ResultsAnalysis";

const SlidePanelTabs = () => {
    const [activeTab, setActiveTab] = useState('');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Coordinate':
                return <Coordinate />;
            case 'InputSystem':
                return <InputSystem/>;
            case 'ResultsAnalysis':
                return <ResultsAnalysis />;
            default:
                return <Home />;
        }
    };

    return (
        <div>
            <div className="tabs">
                <button className="tab" onClick={() => setActiveTab('Coordinate')}>Coordinate</button>
                <button className="tab" onClick={() => setActiveTab('InputSystem')}>Input System</button>
                <button className="tab" onClick={() => setActiveTab('ResultsAnalysis')}>Results Analysis</button>
            </div>
            {renderTabContent()}
        </div>
    );
};

export default SlidePanelTabs;
