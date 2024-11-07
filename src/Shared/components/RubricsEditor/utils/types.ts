import { TTag } from '@dc/graphql/user/queries/tag';
import { TRubricHeadingPlan } from '@dc/graphql/user/queries/rubric';

export type RubricData = {
  criteriaLabels: RubricCriteriaLabel[];
  criterias: RubricCriteria[];
  description?: string;
  headings: RubricHeading[];
  id: string;
  name: string;
};

export type RubricEdit = RubricData & { canEdit: boolean };

export type RubricCriteriaLabel = {
  displayName: string | null;
  id: string;
  score: number;
};

export type RubricCriteria = {
  id?: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
  uuid?: string;
};

export type RubricHeading = {
  id: string;
  multiplier: number;
  name: string;
  tags?: TTag[];
  plans?: TRubricHeadingPlan[];
  statements: { id: string }[];
};

export type FillMissingCriteriasArguments = {
  criteriaLabels: RubricCriteriaLabel[];
  criterias: RubricCriteria[];
  headings: RubricHeading[];
};

export type RubricHeadingIdPairs = {
  headingId: string;
  criteriaLabelId: string;
}[];
