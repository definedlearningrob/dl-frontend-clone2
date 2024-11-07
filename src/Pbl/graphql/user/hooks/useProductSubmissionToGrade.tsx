import { QueryHookOptions, useQuery } from '@apollo/client';

import PRODUCT_SUBMISSION_TO_GRADE, {
  TProductSubmissionToGradeData,
  TProductSubmissionToGradeVariables,
} from '@pbl/graphql/user/queries/productSubmissionToGrade';

const useProductSubmissionToGrade = (
  projectId: string,
  productId: string,
  submitterUuid?: string,
  isTeamGrading?: boolean
) => {
  const queryOptions: QueryHookOptions<
    TProductSubmissionToGradeData,
    TProductSubmissionToGradeVariables
  > = {
    variables: {
      projectId,
      productId,
      submitterUuid: submitterUuid!,
      submitterType: isTeamGrading ? 'TEAM' : 'STUDENT',
    },
    skip: !submitterUuid,
  };

  const checkInQuestion = useQuery<
    TProductSubmissionToGradeData,
    TProductSubmissionToGradeVariables
  >(PRODUCT_SUBMISSION_TO_GRADE, queryOptions);

  return checkInQuestion;
};

export type { TProductSubmissionToGradeData };

export default useProductSubmissionToGrade;
