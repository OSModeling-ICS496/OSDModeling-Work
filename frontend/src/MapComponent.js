import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapComponent = ({ routeData }) => {
    const [markerData, setMarkerData] = useState([]);
    const defaultCenter = [19.8987, -155.6659];

    useEffect(() => {
        fetch('/data/Coordinate.csv')
            .then(response => response.text())
            .then(csvText => Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    const parsedData = results.data
                        .filter(row => !isNaN(parseFloat(row.lat)) && !isNaN(parseFloat(row.lng)) && row.order)
                        .map(row => ({ lat: parseFloat(row.lat), lng: parseFloat(row.lng), order: parseInt(row.order) }))
                        .sort((a, b) => a.order - b.order);

                    setMarkerData(parsedData);
                }
            }));
    }, []);

    const mapCenter = markerData.length > 0 ? [markerData[0].lat, markerData[0].lng] : defaultCenter;

    return (
        <MapContainer center={mapCenter} zoom={7} style={{ height: '100vh', width: '100vw', zIndex: '0'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerData.map((position, idx) => (
                <Marker key={idx} position={[position.lat, position.lng]}>
                    <Popup>
                        Order: {position.order}<br />
                        Lat: {position.lat}, Lng: {position.lng}
                    </Popup>
                </Marker>
            ))}
            {routeData && <Polyline positions={routeData} color="red" />}
        </MapContainer>
    );
};

export default MapComponent;
