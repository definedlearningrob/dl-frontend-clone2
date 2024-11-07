import { isEmpty, mapValues } from 'lodash-es';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { TPlanGroupStatement } from '@shared/graphql/student/query/studentReportProgressByStudent';

export const getGroupProgress = (statements: TPlanGroupStatement[] | undefined = []) => {
  const initialProgress = {
    [EVALUATION_RESULTS_VALUES.COMPLETED]: 0,
    [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: 0,
    [EVALUATION_RESULTS_VALUES.NOT_STARTED]: 0,
    [EVALUATION_RESULTS_VALUES.NOT_MET]: 0,
  };

  if (isEmpty(statements)) {
    return { progress: initialProgress, percentageProgress: initialProgress };
  }

  const progress = statements.reduce((acc, { results }) => {
    if (isEmpty(results)) {
      acc[EVALUATION_RESULTS_VALUES.NOT_STARTED]++;
    } else {
      const latestResult = results[0];
      acc[latestResult.result]++;
    }

    return acc;
  }, initialProgress);

  const percentageProgress = mapValues(progress, (value) => (value / statements.length) * 100);

  return { progress, percentageProgress };
};
