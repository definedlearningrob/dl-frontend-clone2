export type RubricData = {
  criteriaLabels: RubricCriteriaLabel[];
  criterias: RubricCriteria[];
  description?: string;
  headings: RubricHeading[];
  id: string;
  name: string;
  pointsAvailable?: number;
};

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
