import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';

export const statementBreakdownMock = {
  notStarted: 150,
  inProgress: 250,
  completed: 550,
  notMet: 50,
};

export const statementResultsMock = {
  nodesCount: 6,
  pagesCount: 1,
  nodes: [
    {
      answer: ['Vivamus non ipsum eu tellus facilisis bibendum.'],
      evidencesCount: 3,
      lastUpdatedAt: '2023-12-08T13:58:35Z',
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      studentName: 'Jane Pippen',
      studentSisId: '245839',
    },
    {
      answer: null,
      evidencesCount: 0,
      lastUpdatedAt: '2023-12-15T10:08:56Z',
      status: EVALUATION_RESULTS_VALUES.NOT_STARTED,
      studentName: 'John Doe',
      studentSisId: '148969',
    },
    {
      answer: ['Vivamus et sollicitudin massa. Integer lacinia metus at fermentum tincidunt.'],
      evidencesCount: 0,
      lastUpdatedAt: '2023-12-08T13:57:44Z',
      status: EVALUATION_RESULTS_VALUES.IN_PROGRESS,
      studentName: 'Jamal Johnson',
      studentSisId: '938209',
    },
    {
      answer: [
        'Aliquam erat volutpat. Cras venenatis sit amet orci ut sollicitudin. Duis finibus et magna eget imperdiet.',
      ],
      evidencesCount: 2,
      lastUpdatedAt: '2023-12-08T13:56:49Z',
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      studentName: 'Jackie Hardaway',
      studentSisId: '738922',
    },
    {
      answer: ['Pellentesque vel orci lacus. Nulla malesuada sagittis fringilla.'],
      evidencesCount: 10,
      lastUpdatedAt: '2023-12-08T13:55:56Z',
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      studentName: 'Stacy Bird',
      studentSisId: '883921',
    },
    {
      answer: ['Suspendisse nulla odio, facilisis nec luctus sit amet, posuere id lectus.'],
      evidencesCount: 0,
      lastUpdatedAt: '2023-12-08T13:48:35Z',
      status: EVALUATION_RESULTS_VALUES.NOT_MET,
      studentName: 'Jon James',
      studentSisId: '538792',
    },
    {
      answer: ['Pellentesque vel orci lacus. Nulla malesuada sagittis fringilla.'],
      evidencesCount: 10,
      lastUpdatedAt: '2023-12-08T13:55:56Z',
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      studentName: 'Mick Jagger',
      studentSisId: '473828',
    },
    {
      answer: [
        'Curabitur et elit dignissim, maximus ex a, malesuada felis. Proin gravida felis odio, feugiat feugiat est bibendum eu.',
      ],
      evidencesCount: 15,
      lastUpdatedAt: '2023-12-08T13:48:35Z',
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      studentName: 'Robert Makłowicz',
      studentSisId: '538792',
    },
  ],
};

export const statementQuestionMock = { text: 'Lorem ipsum dolor sit amet?', options: [] };
