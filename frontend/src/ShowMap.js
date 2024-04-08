import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ShowMap = ({ coordData }) => {
  const defaultCenter = [19.8987, -155.6659];

  const baseLocation = coordData['baseCoord'];
  const reconLocation = coordData['reconCoord'];

  const mapCenter = coordData && Object.keys(coordData).length > 0 ? [reconLocation.lat, reconLocation.long] : defaultCenter;

  const mapKey = Object.keys(coordData).length;

  return (
      <MapContainer center={mapCenter} zoom={12} style={{ height: '80vh', width: '70vw' }} key={mapKey}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {baseLocation && (
            <Marker position={[baseLocation.lat, baseLocation.long]}>
              <Popup>Base Location <br/>
                Lat: {baseLocation.lat}, long: {baseLocation.long}
              </Popup>
            </Marker>
        )}
        {reconLocation && (
            <>
              <Marker position={[reconLocation.lat, reconLocation.long]}>
                <Popup>Recon Location <br/>
                  Lat: {reconLocation.lat}, long: {reconLocation.long} <br/>
                  Size: {coordData.size} km² <br/>
                  Radius: {(coordData.size / 3.141592653589793) ** 0.5} km
                </Popup>
                <Circle
                    center={[reconLocation.lat, reconLocation.long]}
                    radius={(coordData.size * 1_000_000 / 3.141592653589793) ** 0.5}
                    color="blue"
                    fillColor="blue"
                    fillOpacity={0.5}
                />
              </Marker>

              {baseLocation && (
                  <Polyline
                      positions={[
                        [baseLocation.lat, baseLocation.long],
                        [reconLocation.lat, reconLocation.long],
                      ]}
                      color="red"
                  />
              )}
            </>
        )}
      </MapContainer>
  );
};

export default ShowMap;
