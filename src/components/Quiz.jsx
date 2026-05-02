import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { quizData } from '../data/quizData';
import './Quiz.css';

// Utility to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = () => {
  const { language } = useLanguage();
  const currentData = quizData[language] || quizData['en'];

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize quiz with 5 random questions
  const initQuiz = () => {
    const allQuestions = currentData.questions;
    // Shuffle all questions and pick first 5
    const selected = shuffleArray(allQuestions).slice(0, 5);
    
    // For each selected question, shuffle its options while tracking the correct answer
    const processedQuestions = selected.map(q => {
      const originalCorrectOption = q.o[q.a];
      const shuffledOptions = shuffleArray(q.o);
      const newCorrectIdx = shuffledOptions.indexOf(originalCorrectOption);
      
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectIdx
      };
    });

    setActiveQuestions(processedQuestions);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOptionIdx(null);
  };

  useEffect(() => {
    initQuiz();
  }, [language]); // Restart quiz if language changes, or we can just translate in place if we want to keep state. Restart is safer for shuffled options.

  if (activeQuestions.length === 0) return null;

  const currentQ = activeQuestions[currentQuestionIdx];

  const handleAnswerOptionClick = (index) => {
    if (isAnswered) return;
    
    setSelectedOptionIdx(index);
    setIsAnswered(true);

    if (index === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIdx + 1;
    if (nextQuestion < activeQuestions.length) {
      setCurrentQuestionIdx(nextQuestion);
      setIsAnswered(false);
      setSelectedOptionIdx(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <section id="quiz" className="quiz-section container">
      <h2 className="section-title">{currentData.title}</h2>
      <p className="section-subtitle">{currentData.subtitle}</p>
      
      <div className="quiz-container glass-panel">
        {showScore ? (
          <div className="score-section text-center">
            <h3>{currentData.completedTitle}</h3>
            <div className="score-display">
              {currentData.scoreText} <span className="highlight-score">{score}</span> {currentData.outOf} {activeQuestions.length}
            </div>
            <p className="score-message">
              {score === activeQuestions.length ? currentData.excellent : 
               score > activeQuestions.length / 2 ? currentData.good : 
               currentData.tryAgainText}
            </p>
            <button onClick={initQuiz} className="btn-primary mt-4">{currentData.tryAgainBtn}</button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>{currentData.questionPrefix} {currentQuestionIdx + 1}</span>/{activeQuestions.length}
              </div>
              <div className="question-text">{currentQ.q}</div>
            </div>
            
            <div className="answer-section">
              {currentQ.options.map((option, index) => {
                let buttonClass = 'answer-btn';
                if (isAnswered) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += ' correct';
                  } else if (index === selectedOptionIdx) {
                    buttonClass += ' incorrect';
                  }
                }
                return (
                  <button 
                    key={index} 
                    onClick={() => handleAnswerOptionClick(index)}
                    className={buttonClass}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="explanation-box animate-fade-in">
                <strong>{currentData.explanationPrefix} </strong>
                {currentQ.e}
                <div className="next-action">
                  <button onClick={handleNextQuestion} className="btn-secondary">
                    {currentQuestionIdx === activeQuestions.length - 1 ? currentData.finishBtn : currentData.nextBtn}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Quiz;
