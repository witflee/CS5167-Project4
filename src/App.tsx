import { useState } from 'react';
import InfoCard from './components/InfoCard';
import AqiCard from './components/AqiCard';
import AqiMap from './components/AqiMap';
import { AqiProvider } from './components/AqiContext';
import LocationSearch from './components/LocationSearch';
import './App.css';

function App() {
  const [location, setLocation] = useState('here');

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <div className="app-container">
      <AqiProvider location={location}>
        <div className="info-column">
          <div className="aqi">
            <AqiCard title="Current Air Quality Index" />
          </div>
          <div className="alerts">
            <InfoCard title="Air Quality Alerts" content="No alerts for your area." />
          </div>
        </div>
        <div className="map-column">
          <div className="card">
            <LocationSearch onSearch={handleSearch} />
          </div>
          <div className="map">
            <AqiMap />
          </div>
        </div>
      </AqiProvider>
    </div>
  );
}

export default App;
