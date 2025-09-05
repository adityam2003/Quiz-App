import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './quiz.css';

export const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, data, userAnswers, highScore } = state || {};

  const [index, setIndex] = useState(0);

  if (!state) {
    return (
      <div className="container">
        <h2>No results available. Please take the quiz first.</h2>
        <button onClick={() => navigate('/quiz')}>Start Quiz</button>
      </div>
    );
  }

  const question = data[index];
  const userAnswer = userAnswers[index];

  const next = () => {
    if (index < data.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="container">
      {/* Header same as Quiz */}
      <div className="header">
        <h1>Quiz Review</h1>
        <div className="score-badge">
          🏆 Score: {score}/{data.length}
        </div>
      </div>
      <hr />

      <h3>🔥 Highest Score: {highScore}</h3>

      {/* Question */}
      <h2>
        {index + 1}. {question.question}
      </h2>

      {/* Options */}
      <ul>
        {question.options.map((opt, i) => {
          const isCorrect = question.ans === i + 1;
          const isSelected = userAnswer.selected === i + 1;

          let className = '';
          if (isCorrect) className = 'correct';
          if (isSelected && !isCorrect) className = 'wrong';

          return (
            <li key={i} className={className}>
              {opt} {isSelected ? '👈 Your choice' : ''}
            </li>
          );
        })}
      </ul>

      {/* Navigation */}
      <div className="nav-buttons">
        <button onClick={prev} disabled={index === 0}>
          Prev
        </button>
        <button onClick={next} disabled={index === data.length - 1}>
          Next
        </button>
      </div>

      {/* Reset */}
      <button onClick={() => navigate('/quiz')}>Restart Quiz</button>

      <div className="index">
        {index + 1} of {data.length} questions
      </div>
    </div>
  );
};
