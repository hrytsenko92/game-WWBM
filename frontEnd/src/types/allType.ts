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

type btnBgColorsType = {
  Default: string;
  Red: string;
  Green: string;
  Yellow: string;
  Grey: string;
};

export const btnBgColors: btnBgColorsType = {
  Default: '#035d76',
  Red: '#E9573F',
  Green: '#00e42e',
  Yellow: '#F6BB42',
  Grey: '#808080',
};

export const score: Array<number> = [
  0, 100, 200, 300, 400, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000,
  125000, 250000, 500000, 10000000,
];
