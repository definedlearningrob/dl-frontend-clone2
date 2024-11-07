export type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TCriteria[];
  description?: string;
  displayName?: string;
  headings: THeading[];
  pointsAvailable?: number;
  id: string;
  name: string;
};

type TCriteriaLabel = {
  displayName: string | null;
  id: string;
  score: number;
};

type TCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

type THeading = {
  id: string;
  multiplier: number;
  name: string;
};
