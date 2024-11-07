import { getGroupProgress } from '@shared/components/StudentReport/ProgressDetails/helpers';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { TPlanGroupStatement } from '@shared/graphql/student/query/studentReportProgressByStudent';

describe('getProgress', () => {
  it('should return correct progress and percentageProgress for given statements', () => {
    const statements = [
      {
        results: [
          { result: EVALUATION_RESULTS_VALUES.IN_PROGRESS },
          { result: EVALUATION_RESULTS_VALUES.NOT_STARTED },
          { result: EVALUATION_RESULTS_VALUES.NOT_STARTED },
          { result: EVALUATION_RESULTS_VALUES.NOT_STARTED },
          { result: EVALUATION_RESULTS_VALUES.NOT_STARTED },
          { result: EVALUATION_RESULTS_VALUES.NOT_STARTED },
        ],
      },
      {
        results: [{ result: EVALUATION_RESULTS_VALUES.IN_PROGRESS }],
      },
      {
        results: [{ result: EVALUATION_RESULTS_VALUES.NOT_MET }],
      },
      {
        results: [{ result: EVALUATION_RESULTS_VALUES.COMPLETED }],
      },
      {
        results: [{ result: EVALUATION_RESULTS_VALUES.NOT_STARTED }],
      },
    ] as TPlanGroupStatement[];

    const expected = {
      progress: {
        [EVALUATION_RESULTS_VALUES.COMPLETED]: 1,
        [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: 2,
        [EVALUATION_RESULTS_VALUES.NOT_STARTED]: 1,
        [EVALUATION_RESULTS_VALUES.NOT_MET]: 1,
      },
      percentageProgress: {
        [EVALUATION_RESULTS_VALUES.COMPLETED]: 20,
        [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: 40,
        [EVALUATION_RESULTS_VALUES.NOT_STARTED]: 20,
        [EVALUATION_RESULTS_VALUES.NOT_MET]: 20,
      },
    };

    expect(getGroupProgress(statements)).toEqual(expected);
  });

  it('should handle statements with no results', () => {
    const statements = [
      {
        results: [],
      },
      {
        results: [],
      },
    ];

    const expected = {
      progress: {
        [EVALUATION_RESULTS_VALUES.COMPLETED]: 0,
        [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: 0,
        [EVALUATION_RESULTS_VALUES.NOT_STARTED]: 2,
        [EVALUATION_RESULTS_VALUES.NOT_MET]: 0,
      },
      percentageProgress: {
        [EVALUATION_RESULTS_VALUES.COMPLETED]: 0,
        [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: 0,
        [EVALUATION_RESULTS_VALUES.NOT_STARTED]: 100,
        [EVALUATION_RESULTS_VALUES.NOT_MET]: 0,
      },
    };

    expect(getGroupProgress(statements as unknown as TPlanGroupStatement[])).toEqual(expected);
  });
});
