import React, { useState } from 'react';
import './Door.css';

const Door: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDoorClick = () => {
    setIsOpen(true);
  };

  return (
    <div className={`door-container ${isOpen ? 'open' : ''}`} onClick={handleDoorClick}>
      <div className="door-left"></div>
      <div className="door-right"></div>
    </div>
  );
};

export default Door;
