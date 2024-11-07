import { gql, TypedDocumentNode } from '@apollo/client';

export const GRADE_ASSIGNMENT_SUBMISSION: TypedDocumentNode<
  TGradeAssignmentSubmissionData,
  TGradeAssignmentSubmissionVariables
> = gql`
  mutation GradeAssignmentSubmission($input: GradeAssignmentSubmissionMutationInput!) {
    gradeAssignmentSubmission(input: $input) {
      grade {
        lastGradedBy {
          firstName
          lastName
        }
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

export type TGradeAssignmentSubmissionData = {
  gradeAssignmentSubmission: {
    grade: {
      lastGradedBy: {
        firstName: string;
        lastName: string;
      };
      pointsAvailable: number;
      pointsScored: number;
      results: {
        criteriaId: string;
        trait: string;
      }[];
    };
  };
};

type TGradeAssignmentSubmissionVariables = {
  input: {
    lessonId: string;
    results: {
      criteriaId: string;
      trait: string;
    }[];
    rubricId: string;
    submissionId: string;
  };
};
