import React, { useState, useEffect } from "react";
import "./quiz.css";
import { useNavigate } from "react-router";


const quizData = [  {    question: "What is the capital of France?",    options: ["Paris", "Madrid", "London", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Who wrote the Harry Potter series?",
    options: ["J.K. Rowling", "Stephenie Meyer", "Suzanne Collins", "George R.R. Martin"],
    answer: "J.K. Rowling",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the tallest mammal?",
    options: ["Hippopotamus", "Elephant", "Giraffe", "Rhino"],
    answer: "Giraffe",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest animal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Liechtenstein", "San Marino", "Vatican City"],
    answer: "Vatican City",
  },
];


const QuizApp = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  
  const navigate = useNavigate()
  useEffect(() => {
    const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(leaderboardData);
  }, []);
  
  useEffect(() => {
    const hasTakenQuiz = localStorage.getItem("hasTakenQuiz");
    if (hasTakenQuiz) {
      // User has taken the quiz before, show the leaderboard
      const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(leaderboardData);
      setShowScore(true);
    } else {
      // User has not taken the quiz before
      localStorage.setItem("hasTakenQuiz", true);
      const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(leaderboardData);
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
      document.getElementById(selectedOption).classList.add("correct");
    } else {
      document.getElementById(selectedOption).classList.add("incorrect");
      document.getElementById(quizData[currentQuestion].answer).classList.add("correct");
    }
    setTimeout(() => {
      document.getElementById(selectedOption).classList.remove("correct", "incorrect");
      document.getElementById(quizData[currentQuestion].answer).classList.remove("correct");
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizComplete(true);
      setShowScore(true);
      const newLeaderboard = [...leaderboard, { name, score }];
      newLeaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
      setLeaderboard(newLeaderboard);
      }
      };
      
      const resetQuiz = () => {
        setTimeout(() => {
          navigate("/")
        }, 2000);
      };
      // localStorage.removeItem('leaderboard');
      return (
        
      <div className="quiz-app">
          <div className="name-container">
    {!quizComplete && (
      <div className="name-input">
        <label htmlFor="name">Enter your name: </label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
    )}
  </div>
      {!quizComplete && (
      <div className="quiz-container">
      <div className="question-container">
      <div className="question-count">
      <span>Question {currentQuestion + 1}</span>/{quizData.length}
      </div>
      <div className="question">{quizData[currentQuestion].question}</div>
      </div>
      <div className="options-container">
      {quizData[currentQuestion].options.map((option) => (
      <button
      key={option}
      id={option}
      className="option"
      onClick={() => handleAnswerClick(option)}
      >
      {option}
      </button>
      ))}
      </div>
      </div>
      )}
        {showScore && (
    <div className="score-container">
      <h2>Quiz Complete!</h2>
      <h3>{name}'s Score: {score}/{quizData.length}</h3>
      <button className="reset-button" onClick={resetQuiz}>
        Reset Quiz
      </button>
    </div>
  )}

  <div className="leaderboard-container">
    <h2>Leaderboard</h2>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
};

export default QuizApp;
