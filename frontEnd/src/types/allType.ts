export interface QuestionType {
  nextQuestion: NextQuestion;
}

export interface NextQuestion {
  _id: string;
  id: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  _id: string;
  answer: string;
  isTrue: boolean;
}

export type AdwiseType = {
  active: boolean;
};

export const defaultAdwise: AdwiseType[] = [
  {
    active: true,
  },
  {
    active: true,
  },
  {
    active: true,
  },
  {
    active: true,
  },
];

export const score: Array<number> = [
  0, 100, 200, 300, 400, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000,
  125000, 250000, 500000, 10000000
];

export const urlPath = 'http://localhost:5001';
// 'https://game-wwbm.vercel.app'
