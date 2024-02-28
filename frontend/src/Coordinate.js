import React, { useState } from "react";

// const Coordinate = ({ onCoordinatesSubmit }) => {
const Coordinate = ({  }) => {
    const [startCoord, setStartCoord] = useState({ lat: '', lng: '' });
    const [endCoord, setEndCoord] = useState({ lat: '', lng: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test", {startCoord, endCoord});
        //onCoordinatesSubmit({ startCoord, endCoord })
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Enter Coordinates</h3>
            <div>
                <label id={'startPoint'}>Start Point:</label>
                <br/>
                <input type={'text'} id={'startPointN'} value={startCoord.lat}
                       onChange={(e) => setStartCoord({...startCoord, lat: e.target.value})}/>
                <span>N°</span>
                <input type={'text'} id={'startPointW'} value={startCoord.lng}
                       onChange={(e) => setStartCoord({...startCoord, lng: e.target.value})}/>
                <span>W°</span>
            </div>

            <div>
                <label id={'endPoint'}>End Point:</label>
                <br/>
                <input type={'text'} id={'endPointN'} value={endCoord.lat}
                       onChange={(e) => setEndCoord({...endCoord, lat: e.target.value})}/>
                <span>N°</span>
                <input type={'text'} id={'endPointW'} value={endCoord.lng}
                       onChange={(e) => setEndCoord({...endCoord, lng: e.target.value})}/>
                <span>W°</span>
            </div>

            <button type={'submit'}>Submit</button>
        </form>

    );
};

export default Coordinate;