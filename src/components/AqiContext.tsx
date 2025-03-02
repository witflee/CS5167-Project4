import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AqiData {
  aqi: number;
  city: {
    name: string;
    geo: [number, number];
  };
  dominentpol: string;
}

interface AqiContextProps {
  aqiData: AqiData | null;
  loading: boolean;
  error: string | null;
}

const AqiContext = createContext<AqiContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAqi = () => {
  const context = useContext(AqiContext);
  if (context === undefined) {
    throw new Error('useAqi must be used within an AqiProvider');
  }
  return context;
};

interface AqiProviderProps {
  location: string;
  children: React.ReactNode;
}

export const AqiProvider: React.FC<AqiProviderProps> = ({ location, children }) => {
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/${location}/?token=25c9b3cc3d60a300bef5fea354bb3e855c279782`
        );
        setAqiData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch AQI data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAqiData();
  }, [location]);

  return (
    <AqiContext.Provider value={{ aqiData, loading, error }}>
      {children}
    </AqiContext.Provider>
  );
};