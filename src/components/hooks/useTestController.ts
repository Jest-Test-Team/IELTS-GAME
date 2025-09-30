'use client';

import { useState, useCallback } from 'react';
import { Question, TestStats, SessionError, TestType } from '@/types';
import { useLocalStorage } from './useLocalStorage';

export function useTestController(type: TestType, data: Question[]) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(data[0]);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionErrors, setSessionErrors] = useState<SessionError[]>([]);
  
  const [stats, setStats] = useLocalStorage<TestStats>(`${type}Stats`, {
    attempts: 0,
    correct: 0,
  });

  const loadNewQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setCurrentQuestion(data[randomIndex]);
  }, [data]);

  const checkAnswer = useCallback((userAnswer: string) => {
    if (userAnswer.trim() === '') return false;

    const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
    
    setStats(prevStats => ({
      attempts: prevStats.attempts + 1,
      correct: isCorrect ? prevStats.correct + 1 : prevStats.correct,
    }));
    
    setSessionAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
    } else {
      setSessionErrors(prev => [...prev, {
        prompt: currentQuestion.prompt,
        userAnswer: userAnswer,
        correctAnswer: currentQuestion.answer,
      }]);
    }

    return isCorrect;
  }, [currentQuestion, setStats]);

  const showReport = useCallback(() => {
    const modal = document.getElementById(`${type}-report-modal`) || document.getElementById('report-modal');
    if (modal) {
      modal.classList.add('show');
    }
  }, [type]);

  const resetSession = useCallback(() => {
    setSessionAttempts(0);
    setSessionCorrect(0);
    setSessionErrors([]);
  }, []);

  const closeReport = useCallback(() => {
    const modal = document.getElementById(`${type}-report-modal`) || document.getElementById('report-modal');
    if (modal) {
      modal.classList.remove('show');
    }
    resetSession();
  }, [resetSession, type]);

  return {
    currentQuestion,
    sessionAttempts,
    sessionCorrect,
    sessionErrors,
    stats,
    loadNewQuestion,
    checkAnswer,
    showReport,
    resetSession,
    closeReport,
  };
}
