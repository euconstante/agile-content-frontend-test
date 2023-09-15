import React from 'react';
import './Loader.css';

const Loader = ({ numBars = 30 }) => {
  const bars = Array.from({ length: numBars }, (_, index) => {
    // Generate random widths for the bars
    const randomWidth = `${Math.random() * 70 + 10}%`; // Random width between 10% and 80%
    return (
      <div
        key={index}
        className="loading-bar"
        style={{ width: randomWidth }}
      ></div>
    );
  });

  return <div className="loading-bars-container">{bars}</div>;
};

export default Loader;
