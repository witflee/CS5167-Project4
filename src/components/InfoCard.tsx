// this will be the card component that functions as a container for information that needs to be displayed

import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  content: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <div className="info-card">
      <h2 className="info-card-title">{title}</h2>
      <p className="info-card-content">{content}</p>
    </div>
  );
};

export default InfoCard;