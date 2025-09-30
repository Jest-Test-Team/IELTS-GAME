export interface Question {
  prompt: string;
  answer: string;
  hint?: string;
  options?: string[];
  chineseMeaning?: string;
}

export interface TestStats {
  attempts: number;
  correct: number;
}

export interface SessionError {
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  wrongCount: number;
}

export interface TestControllerState {
  currentQuestion: Question;
  sessionAttempts: number;
  sessionCorrect: number;
  sessionErrors: SessionError[];
  stats: TestStats;
}

export type TestType = 'spelling' | 'grammar' | 'overall';
