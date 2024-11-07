import { RubricCriteria, RubricCriteriaLabel } from './types';

export const byCriteriaLabelIds =
  (criteriaLabels: RubricCriteriaLabel[]) =>
  (criteriaA: RubricCriteria, criteriaB: RubricCriteria) =>
    criteriaLabels.findIndex((label) => label.id === criteriaA.rubricCriteriaLabelId) -
    criteriaLabels.findIndex((label) => label.id === criteriaB.rubricCriteriaLabelId);
