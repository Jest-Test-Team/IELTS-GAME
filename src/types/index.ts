export interface Question {
  prompt: string;
  answer: string;
  hint?: string;
  options?: string[];
}

export interface TestStats {
  attempts: number;
  correct: number;
}

export interface SessionError {
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
}

export interface TestControllerState {
  currentQuestion: Question;
  sessionAttempts: number;
  sessionCorrect: number;
  sessionErrors: SessionError[];
  stats: TestStats;
}

export type TestType = 'spelling' | 'grammar' | 'overall';
