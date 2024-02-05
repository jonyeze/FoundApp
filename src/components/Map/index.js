import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({ address }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            format: 'json',
            q: address,
            limit: 1,
          },
        });

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLocation([lat, lon]);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [address]);

  if (!location) {
    return <p>Cargando...</p>;
  }

  return (
    <MapContainer center={location} zoom={14} scrollWheelZoom={false} style={{ height: "200px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>
          Ubicación: {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
