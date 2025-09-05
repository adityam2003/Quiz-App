
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz.css';
import { ProgressBar } from './ProgressBar';
import { HighScore } from './HighScore';
import { getQuestions } from '../../Services/quizService';

export const Quiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(null);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [timeLeft, setTimeLeft] = useState(30);
  let [userAnswers, setUserAnswers] = useState([]);
  let [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );

  let Option1 = useRef(), Option2 = useRef(), Option3 = useRef(), Option4 = useRef();
  let optionArray = [Option1, Option2, Option3, Option4];

  // 🔹 Fetch questions once
  useEffect(() => {
    async function load() {
      const qs = await getQuestions(10); // get 10 questions
      setQuestions(qs);
      setQuestion(qs[0]);
      setLoading(false);
    }
    load();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!question || lock) return;
    if (timeLeft === 0 && !lock) {
      optionArray[question.ans - 1].current.classList.add('correct');
      setLock(true);
      setUserAnswers((prev) => [
        ...prev,
        { question: question.question, options: question.options, correct: question.ans, selected: null },
      ]);
    }
    if (timeLeft > 0 && !lock) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, lock, question]);

  // Answer selection
  const checkans = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
      setUserAnswers((prev) => [
        ...prev,
        { question: question.question, options: question.options, correct: question.ans, selected: ans },
      ]);
    }
  };

  // Next Question
  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        if (score > highScore) {
          localStorage.setItem('highScore', score);
          setHighScore(score);
        }
        navigate('/results', { state: { score, data: questions, userAnswers, highScore } });
        return;
      }
      setIndex((prev) => prev + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      setTimeLeft(30);
      optionArray.forEach((o) => o.current.classList.remove('correct', 'wrong'));
    }
  };

  if (loading) {
    return <div className="container"><h2>Loading questions...</h2></div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Quiz App</h1>
        <div className="timer" style={{ color: timeLeft <= 10 ? 'red' : '#333' }}>
          ⏳ {timeLeft}s
        </div>
      </div>
      <hr />

      <HighScore highScore={highScore} />
      <ProgressBar current={index} total={questions.length} locked={lock} />

      <h2>{index + 1}. {question.question}</h2>
      <ul>
        {question.options.map((opt, i) => (
          <li
            key={i}
            ref={optionArray[i]}
            tabIndex="0"
            role="button"
            aria-pressed={lock && question.ans === i + 1}
            onClick={(e) => checkans(e, i + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                checkans(e, i + 1);
              }
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index + 1} of {questions.length} questions</div>
    </div>
  );
};

