import { useMutation } from '@apollo/client';

import {
  UPDATE_ASSIGNMENT_SUBMISSION_MUTATION,
  TUpdateAssignmentSubmission,
  TUpdateAssignmentSubmissionVIData,
  TUpdateAssignmentSubmissionVIVariable,
} from '@dc/graphql/student/mutations/updateAssignmentSubmission';

import { VIRTUAL_INTERNSHIP_CONTENT_QUERY } from '../queries/virtualInternshipContent';

export const useUpdateAssignmentSubmissionVI = (opportunityId: string) => {
  const [mutate, { loading, error }] = useMutation<
    TUpdateAssignmentSubmissionVIData,
    TUpdateAssignmentSubmissionVIVariable
  >(UPDATE_ASSIGNMENT_SUBMISSION_MUTATION);

  const updateAssignmentSubmission = async ({ id, status }: TUpdateAssignmentSubmission) => {
    await mutate({
      variables: {
        input: { id, status },
      },
      refetchQueries: [{ query: VIRTUAL_INTERNSHIP_CONTENT_QUERY, variables: { opportunityId } }],
    });
  };

  return [updateAssignmentSubmission, { loading, error }] as const;
};
