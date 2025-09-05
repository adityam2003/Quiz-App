import React from 'react';
import './quiz.css';

export const HighScore = ({ highScore }) => {
  return <div className="highscore">🔥 Highest Score: {highScore}</div>;
};
