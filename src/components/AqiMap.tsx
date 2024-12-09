// this will be the air quality map component
// token = 25c9b3cc3d60a300bef5fea354bb3e855c279782

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useAqi } from './AqiContext';
import 'leaflet/dist/leaflet.css';

// Helper to dynamically set the map view
const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, zoom);
      }
    }, [map, center, zoom]);
    return null;
  };

const AqiMap: React.FC = () => {
  const { aqiData, loading, error } = useAqi();
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (aqiData && aqiData.city && aqiData.city.geo) {
      setCenter(aqiData.city.geo);
    }
  }, [aqiData]);

  if (loading) {
    return <div style={{ height: '400px', width: '100%', background: '#f2efe9' }}>Loading map...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!center) {
    return <div>No data available</div>;
  }

  const zoom = 10;

  return (
    <MapContainer style={{ height: '400px', width: '100%' }}>
      <SetView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=25c9b3cc3d60a300bef5fea354bb3e855c279782"
        //attribution='&copy; <a href="https://waqi.info/">AQICN</a>'
      />
    </MapContainer>
  );
};

export default AqiMap;