import React, { useState, useEffect } from 'react';
import { quiz } from '../../data';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz?.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newScore = { name, score };
    setLeaderboard([...leaderboard, newScore]);
    setName('');
    setScore(0);
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quiz?.questions.length}
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quiz.questions.length}
            </div>
            <div className='question-text'>{quiz.questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quiz.questions[currentQuestion].choices.map((choice, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(choice === quiz.questions[currentQuestion].correctAnswer)}>
                {choice}
              </button>
            ))}
          </div>
        </>
      )}
      <div>
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Quiz;
