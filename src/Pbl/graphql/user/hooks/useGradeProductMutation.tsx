import { useMutation } from '@apollo/client';

import GRADE_PRODUCT_SUBMISSION, {
  TGradeProductSubmissionMutationData,
  TGradeProductSubmisisonMutationVariables,
  TGradeProductSubmssionResult,
} from '@pbl/graphql/user/mutations/gradeProductSubmission';

const parseResults = (results: TGradeProductSubmssionResult[]): TGradeProductSubmssionResult[] =>
  results.map((result) => ({
    criteriaId: result.criteriaId,
    ...(result.trait && { trait: result.trait }),
  }));

const useGradeProductMutation = (projectId: string, rubricId: string) => {
  const [mutate, { loading }] = useMutation<
    TGradeProductSubmissionMutationData,
    TGradeProductSubmisisonMutationVariables
  >(GRADE_PRODUCT_SUBMISSION);

  const gradeSubmission = async (submissionId: string, results: TGradeProductSubmssionResult[]) =>
    mutate({
      variables: {
        input: {
          submissionId,
          taskId: projectId,
          rubricId,
          results: parseResults(results),
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify({ id: rubricId, __typename: 'Rubric' }),
          fields: {
            canEdit: () => false,
          },
        });
        cache.modify({
          id: cache.identify({ id: submissionId, __typename: 'ProductSubmission' }),
          fields: {
            grade: (existing) => data?.gradeProductSubmission.grade ?? existing,
          },
        });
      },
    });

  return [gradeSubmission, { loading }] as const;
};

export default useGradeProductMutation;
