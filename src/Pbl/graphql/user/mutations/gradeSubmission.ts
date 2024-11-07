import { gql } from '@apollo/client';

import { SUBMISSION_TYPE } from '@pbl/resources/enums';

import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

export default gql`
  mutation GradeSubmission($input: GradeCheckInSubmissionMutationInput!) {
    gradeCheckInSubmission(input: $input) {
      submissionGrade {
        id
        status
        updatedAt
        lastGradedBy {
          firstName
          lastName
        }
      }
    }
  }
`;

export type TGradeSubmissionMutationData = {
  gradeCheckInSubmission: {
    submissionGrade: TSubmisisonGrade;
  };
};

export type TGradeSubmisisonMutationVariables = {
  input: TGradeSubmissionInput;
};

type TSubmisisonGrade = {
  id: string;
  status: SUBMISSION_GRADE_STATUS;
  updatedAt: string;
  lastGradedBy: {
    firstName: string;
    lastName: string;
  };
};

type TGradeSubmissionInput = {
  status: SUBMISSION_GRADE_STATUS;
  submissionId: string;
  submissionType: SUBMISSION_TYPE;
  taskId: string;
};
