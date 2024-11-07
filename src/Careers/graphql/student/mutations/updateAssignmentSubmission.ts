import { gql, TypedDocumentNode } from '@apollo/client';

import { SUBMISSION_GRADE_STATUS, SUBMISSION_STATUS } from '@shared/resources/enums';

export const UPDATE_ASSIGNMENT_SUBMISSION_MUTATION: TypedDocumentNode<
  TUpdateAssignmentSubmissionVIData,
  TUpdateAssignmentSubmissionVIVariable
> = gql`
  mutation UpdateAssignmentSubmissionMutation($input: UpdateAssignmentSubmissionMutationInput!) {
    updateAssignmentSubmission(input: $input) {
      assignmentSubmission {
        files {
          filename
        }
        grade {
          createdAt
          id
        }
        id
        status
      }
      clientMutationId
    }
  }
`;

export type TAssignmentSubmissionFile = {
  filename: string;
  googleWeblink: string;
  id: string;
  source: string;
  url: string;
};

export type TSubmissionGrade = {
  createdAt: string;
  id: string;
  lastGradedBy: string;
  status: SUBMISSION_GRADE_STATUS;
  updatedAt: string;
};

export type TAssignmentSubmission = {
  files: TAssignmentSubmissionFile[];
  grade: TSubmissionGrade[];
  id: string;
  status: SUBMISSION_STATUS;
};

export type TUpdateAssignmentSubmissionVIData = {
  assignmentSubmission: TAssignmentSubmission;
};
export type TUpdateAssignmentSubmission = {
  id: string;
  courseId?: string;
  status: SUBMISSION_STATUS | string;
};

export type TUpdateAssignmentSubmissionVIVariable = {
  input: TUpdateAssignmentSubmission;
};
