import React from 'react';
import './quiz.css';

export const ProgressBar = ({ current, total, locked }) => {
  const progressPercent = ((current + (locked ? 1 : 0)) / total) * 100;

  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};
