export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  reference?: string;
}

export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 15,
  TIME_PER_QUESTION: 20,
  MAX_HEARTS: 5,
  REWARD_GEMS: 5,
};