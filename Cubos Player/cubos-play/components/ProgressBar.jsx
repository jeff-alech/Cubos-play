import React from 'react';
import circle from '../src/assets/Ellipse 2.png';

const ProgressBar = ({ currentTime, totalTime, lineSize, formatTime }) => {
  return (
    <div className="timer">
      <p className="time">{formatTime(currentTime)}</p>
      <div className="timeBar">
        <img className="circleTime" src={circle} style={{ left: lineSize + 'px' }} alt="circle" />
        <div className="redLine" style={{ width: lineSize + 'px' }}></div>
      </div>
      <p className="time">{formatTime(totalTime)}</p>
    </div>
  );
};

export default ProgressBar;
