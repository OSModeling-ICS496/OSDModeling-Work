import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ coordData }) => {
    const defaultCenter = [19.8987, -155.6659];
    const mapCenter = coordData && coordData.length > 0 ? [coordData[0].lat, coordData[0].lng] : defaultCenter;

    const mapKey = coordData.length;

    return (
        <MapContainer center={mapCenter} zoom={7} style={{ height: '600px', width: '100%' }} key={mapKey}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {coordData.map((position, idx) => (
                <Marker key={idx} position={[position.lat, position.lng]}>
                    <Popup>
                        Order: {position.order}<br />
                        Lat: {position.lat}, Lng: {position.lng}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
