import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.geodesic';

// Fixing default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const GeodesicLine = ({ positions }) => {
    const map = useMap();

    React.useEffect(() => {
        // Ensure positions are in the correct format
        const formattedPositions = positions.map(pos => new L.LatLng(pos[0], pos[1]));

        const geodesic = new L.geodesic([formattedPositions], {
            weight: 5,
            opacity: 0.5,
            color: 'red',
            steps: 50
        });
        geodesic.addTo(map);

        return () => {
            geodesic.remove();
        };
    }, [positions, map]);

    return null;
};


const ShowMap = ({ coordData }) => {
    const defaultCenter = [19.8987, -155.6659];
    const baseLocation = coordData['baseCoord'];
    const reconLocation = coordData['reconCoord'];
    const mapCenter = reconLocation ? [reconLocation.lat, reconLocation.long] : defaultCenter;
    const mapKey = Object.keys(coordData).length;

    return (
        <div style={{height: '80vh', width: '100%'}}>
            <MapContainer center={mapCenter} zoom={12} style={{height: '100%', width: '100%'}} key={mapKey}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    noWrap={true}
                />
                {baseLocation && (
                    <Marker position={[baseLocation.lat, baseLocation.long]}>
                        <Popup>Base Location <br/> Lat: {baseLocation.lat}, long: {baseLocation.long}</Popup>
                    </Marker>
                )}
                {reconLocation && (
                    <>
                        <Marker position={[reconLocation.lat, reconLocation.long]}>
                            <Popup>
                                Recon Location <br/>
                                Lat: {reconLocation.lat}, long: {reconLocation.long} <br/>
                                Size: {coordData.size} km² <br/>
                                Radius: {(coordData.size / Math.PI) ** 0.5} km
                            </Popup>
                            <Circle
                                center={[reconLocation.lat, reconLocation.long]}
                                radius={(coordData.size * 1_000_000 / Math.PI) ** 0.5}
                                color="blue"
                                fillColor="blue"
                                fillOpacity={0.5}
                            />
                        </Marker>
                        {baseLocation && (
                            <GeodesicLine positions={[[baseLocation.lat, baseLocation.long], [reconLocation.lat, reconLocation.long]]} />
                        )}
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default ShowMap;
