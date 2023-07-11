export type AType = {
  answer: string;
  isTrue: boolean;
};
export type QType = {
  complexity: number;
  id: string;
  question: string;
  answers: AType[];
};

export const testQ: QType = {
  complexity: 10,
  id: 'id001',
  question: 'best game?',
  answers: [
    {
      answer: 'Dirt 2.0',
      isTrue: true,
    },
    {
      answer: 'TES Skyrim',
      isTrue: false,
    },
    {
      answer: 'FIFA',
      isTrue: false,
    },
    {
      answer: 'Witcher 3',
      isTrue: false,
    },
  ],
};

export type AdwiseType = {
  active: boolean;
}
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
