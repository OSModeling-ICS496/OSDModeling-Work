import React, { useState } from 'react';
import MapComponent from './MapComponent';
import SlidePanel from './SlidePanel';

function App() {

    return (
        <div className="App">
            <SlidePanel />
            <MapComponent routeData={''} />
        </div>
    );
}

export default App;
