import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ routeData }) => {
    const defaultCenter = [19.8987, -155.6659];

    return (
        <MapContainer center={defaultCenter} zoom={7} style={{ height: '100vh', width: '100vw', zIndex: '0'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routeData && <Polyline positions={routeData} color="red" />}
        </MapContainer>
    );
};

export default MapComponent;
