import { gql } from '@apollo/client';

export default gql`
  mutation GradeProductSubmission($input: GradeProductSubmissionMutationInput!) {
    gradeProductSubmission(input: $input) {
      grade {
        lastGradedBy {
          uuid
          name
        }
        updatedAt
        pointsAvailable
        pointsScored
        results {
          criteriaId
          trait
        }
      }
    }
  }
`;

export type TGradeProductSubmissionMutationData = {
  gradeProductSubmission: {
    grade: TProductSubmisisonGrade;
  };
};

export type TGradeProductSubmisisonMutationVariables = {
  input: TGradeProductSubmissionInput;
};

type TProductSubmisisonGrade = {
  lastGradedBy: {
    uuid: string;
    name: string;
  };
  updatedAt: string;
  pointsAvailable: number;
  pointsScored: number;
  results: TGradeProductSubmssionResult[];
};

type TGradeProductSubmissionInput = {
  taskId: string;
  rubricId: string;
  results: TGradeProductSubmssionResult[];
  submissionId: string;
};

export type TGradeProductSubmssionResult = {
  criteriaId: string;
  trait?: string;
};
