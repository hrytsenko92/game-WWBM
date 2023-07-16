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

// export const score: Array<string> = [
//   '1,000,000 *',
//   '500,000',
//   '250,000',
//   '125,000',
//   '64,000',
//   '32,000 *',
//   '16,000',
//   '8000',
//   '4000',
//   '2000',
//   '1000 *',
//   '500',
//   '400',
//   '300',
//   '200',
//   '100',
// ];
export const score: Array<string> = [
  'zero',
  '100',
  '200',
  '300',
  '400',
  '500',
  '1000 *',
  '2000',
  '4000',
  '8000',
  '16,000',
  '32,000 *',
  '64,000',
  '125,000',
  '250,000',
  '500,000',
  '1,000,000 *',
];