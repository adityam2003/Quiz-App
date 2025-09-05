import React from 'react';
import './quiz.css';

export const Review = ({ userAnswers, reviewIndex, prevReview, nextReview }) => {
  return (
    <div className="review">
      <h3>
        Review Q{reviewIndex + 1} of {userAnswers.length}
      </h3>
      <p>{userAnswers[reviewIndex].question}</p>
      <ul>
        {userAnswers[reviewIndex].options.map((opt, i) => {
          let style = {};
          if (i + 1 === userAnswers[reviewIndex].correct) {
            style = { backgroundColor: '#a0ffb8', border: '2px solid #00b33c' };
          }
          if (userAnswers[reviewIndex].selected === i + 1) {
            style =
              userAnswers[reviewIndex].correct === i + 1
                ? { backgroundColor: '#a0ffb8', border: '2px solid #00b33c' }
                : { backgroundColor: '#ffb8b8', border: '2px solid #b30000' };
          }
          if (
            userAnswers[reviewIndex].selected === null &&
            i + 1 === userAnswers[reviewIndex].correct
          ) {
            style = { backgroundColor: '#a0ffb8', border: '2px solid #00b33c' };
          }
          return (
            <li key={i} style={style}>
              {opt}
            </li>
          );
        })}
      </ul>
      <div className="review-buttons">
        <button onClick={prevReview} disabled={reviewIndex === 0}>
          Prev
        </button>
        <button
          onClick={nextReview}
          disabled={reviewIndex === userAnswers.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
