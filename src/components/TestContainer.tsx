'use client';

import { useState, useEffect, useRef } from 'react';
import { Question, TestType } from '@/types';
import { useTestController } from './hooks/useTestController';

interface TestContainerProps {
  type: TestType;
  data: Question[];
  title: string;
  description: string;
}

export default function TestContainer({ type, data, title, description }: TestContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    currentQuestion,
    sessionAttempts,
    sessionCorrect,
    sessionErrors,
    stats,
    loadNewQuestion,
    checkAnswer,
    showReport,
  } = useTestController(type, data);

  useEffect(() => {
    loadNewQuestion();
  }, [loadNewQuestion]);

  useEffect(() => {
    if (sessionAttempts >= 40 && sessionAttempts % 40 === 0) {
      setTimeout(() => showReport(), 100); // 小延遲確保 DOM 已更新
    }
  }, [sessionAttempts, showReport]);

  const handleCheckAnswer = () => {
    const isCorrect = checkAnswer(inputValue);
    
    if (isCorrect) {
      setFeedback({ message: '✅ Correct!', isCorrect: true });
      setTimeout(() => {
        setFeedback(null);
        setInputValue('');
        loadNewQuestion();
        inputRef.current?.focus();
      }, 1200);
    } else {
      setFeedback({
        message: `❌ Incorrect. The correct answer is: ${currentQuestion.answer}`,
        isCorrect: false,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckAnswer();
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
  };

  const rate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;

  return (
    <div className="container">
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div className="prompt">
        {currentQuestion.prompt}
        {type === 'spelling' && currentQuestion.hint && ` (${currentQuestion.hint})`}
      </div>

      {type === 'overall' && currentQuestion.options && (
        <div className="options-container">
          {currentQuestion.options
            .sort(() => Math.random() - 0.5)
            .map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
        </div>
      )}

      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            type === 'overall' 
              ? "Click an option above to fill..." 
              : type === 'grammar'
              ? "Type only the missing part..."
              : "Type the correct word here..."
          }
        />
        <button onClick={handleCheckAnswer}>Check</button>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          {feedback.message}
        </div>
      )}

      <div className="stats">
        Total Attempts: {stats.attempts} | Correct: {stats.correct} | Rate: {rate}%
      </div>
    </div>
  );
}
