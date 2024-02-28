import React, { useState } from 'react';
import * as d3 from 'd3';
import Papa from 'papaparse';

const Coordinate = () => {
    const [coordinates, setCoordinates] = useState([]);
    const [newCoord, setNewCoord] = useState({ lat: '', lng: '', order: 1 });

    const handleAddCoordinate = () => {
        setCoordinates([...coordinates, { ...newCoord, order: coordinates.length + 1 }]);
        setNewCoord({ lat: '', lng: '', order: coordinates.length + 2 });
    };

    const handleRemoveCoordinate = (indexToRemove) => {
        const updatedCoordinates = coordinates.filter((_, index) => index !== indexToRemove)
            .map((coord, index) => ({ ...coord, order: index + 1 }));
        setCoordinates(updatedCoordinates);
    };

    const handleSort = (index, newOrder) => {
        let tempCoords = [...coordinates];
        tempCoords[index].order = parseInt(newOrder, 10);
        tempCoords = d3.sort(tempCoords, d => d.order);
        setCoordinates(tempCoords);
    };

    const exportToCSV = () => {
        const csv = Papa.unparse(coordinates);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Coordinate.csv';
        link.click();
    };

    return (
        <div>
            <h3>Enter Coordinate:</h3>
            <input
                type="text"
                value={newCoord.lat}
                onChange={(e) => setNewCoord({...newCoord, lat: e.target.value})}
                placeholder="Latitude"
            />
            <span>N°</span>
            <input
                type="text"
                value={newCoord.lng}
                onChange={(e) => setNewCoord({...newCoord, lng: e.target.value})}
                placeholder="Longitude"
            />
            <span>W°</span>
            <br/>
            <button onClick={handleAddCoordinate}>Add Point</button>
            <br/>
            {coordinates.map((coord, index) => (
                <div key={index}>
                    {index + 1}. lat: {coord.lat} N lng: {coord.lng} W
                    <select
                        value={coord.order}
                        onChange={(e) => handleSort(index, e.target.value)}>
                        {Array.from({length: coordinates.length}, (_, i) => i + 1).map((order) => (
                            <option key={order} value={order}>
                                {order}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => handleRemoveCoordinate(index)}>Remove</button>
                </div>
            ))}
            <button onClick={exportToCSV}>Save as CSV</button>
            <br/>
            <span>please save file in public/data</span>
        </div>
    );
};

export default Coordinate;
