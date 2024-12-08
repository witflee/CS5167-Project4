// this will be the main card displaying air quality index

import React from 'react';
import { useAqi } from './AqiContext';
import './AqiCard.css';

interface AqiCardProps {
    title: string;
}

const AqiCard: React.FC<AqiCardProps> = ({ title }) => {
    const { aqiData, loading, error } = useAqi();

    const getAqiStatus = (value: number) => {
        if (value <= 50) return 'Good';
        if (value <= 100) return 'Moderate';
        if (value <= 150) return 'Unhealthy for Sensitive Groups';
        if (value <= 200) return 'Unhealthy';
        if (value <= 300) return 'Very Unhealthy';
        if (value >= 301) return 'Hazardous';
        return 'NO DATA';
    };

    const getAqiDescription = (value: number) => {
        if (value <= 50) return 'Air quality is satisfactory, and air pollution poses little or no risk.';
        if (value <= 100) return 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
        if (value <= 150) return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
        if (value <= 200) return 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
        if (value <= 300) return 'Health alert: The risk of health effects is increased for everyone.';
        if (value >= 301) return 'Health warning of emergency conditions: everyone is more likely to be affected.';
        return 'There is no data available for this location.';
    };
    
    const getAqiColor = (value: number) => {
        if (value <= 50) return 'green';
        if (value <= 100) return 'yellow';
        if (value <= 150) return 'orange';
        if (value <= 200) return 'red';
        if (value <= 300) return 'purple';
        if (value >= 301) return 'maroon';
        return 'gray';
    };

    const getBgColor = (value: number) => {
        if (value <= 50) return 'lightgreen';
        if (value <= 100) return 'lemonchiffon';
        if (value <= 150) return 'sandybrown';
        if (value <= 200) return 'coral';
        if (value <= 300) return 'violet';
        if (value >= 301) return 'indianred';
        return 'lightgray';
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }
    
    if (!aqiData) {
        return <div>No data available</div>;
    }

    const aqiStatus = getAqiStatus(aqiData.aqi);
    const aqiDescription = getAqiDescription(aqiData.aqi);
    const aqiColor = getAqiColor(aqiData.aqi);
    const aqiBgColor = getBgColor(aqiData.aqi);


    return (
        <div className="aqi-card" style={{ borderColor: aqiColor, backgroundColor: aqiBgColor}}>
            <h2 className="aqi-card-title">{title}</h2>
            <h1 className="aqi-card-content">{aqiStatus} {aqiData.aqi ? "("+aqiData.aqi+")" : ""}</h1>
            <p>{aqiDescription}</p>
        </div>
    );
};

export default AqiCard;