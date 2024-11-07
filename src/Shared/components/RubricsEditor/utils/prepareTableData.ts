import { v4 as uuid } from 'uuid';

import {
  FillMissingCriteriasArguments,
  RubricHeadingIdPairs,
  RubricCriteria,
  RubricData,
} from './types';

const fillMissingCriteria = ({
  headings,
  criteriaLabels,
  criterias,
}: FillMissingCriteriasArguments): RubricCriteria[] => {
  const labelIds = criteriaLabels.map((label) => label.id);
  const headingIds = headings.map((heading) => heading.id);

  const labelHeadingIdPairs: RubricHeadingIdPairs = labelIds.reduce(
    (acc: RubricHeadingIdPairs, criteriaLabelId) => {
      const pairsForFirst = headingIds.map((headingId) => ({ headingId, criteriaLabelId }));
      acc.push(...pairsForFirst);

      return acc;
    },
    []
  );

  return labelHeadingIdPairs.map((pair) => {
    const foundCriteria = criterias.find(
      ({ rubricCriteriaLabelId, rubricHeadingId }) =>
        rubricCriteriaLabelId === pair.criteriaLabelId && rubricHeadingId === pair.headingId
    );

    return (
      foundCriteria || {
        uuid: uuid(),
        text: '',
        rubricCriteriaLabelId: pair.criteriaLabelId,
        rubricHeadingId: pair.headingId,
      }
    );
  });
};

export const prepareTableData = (rubric: RubricData): RubricData => {
  const { criterias, headings, criteriaLabels } = rubric;

  return {
    ...rubric,
    criterias: fillMissingCriteria({ headings, criteriaLabels, criterias }),
  };
};
