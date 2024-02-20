import React, { useState } from 'react';
import MapComponent from './MapComponent';
import SlidePanel from './SlidePanel';

function App() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const routeData = [[19.5987, -155.4659], [19.8987, -155.8659], [20.9987, -156.9659]];
    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    return (
        <div className="App">
            <SlidePanel />
            <MapComponent routeData={routeData} />
        </div>
    );
}

export default App;
