import React, { useState } from 'react';
import MapComponent from './MapComponent';
import SlidePanel from './SlidePanel';

function App() {
    const routeData = [[19.5987, -155.4659], [19.8987, -155.8659], [20.9987, -156.9659]];

    return (
        <div className="App">
            <SlidePanel />
            <MapComponent routeData={routeData} />
        </div>
    );
}

export default App;
