import { useQuery } from '@apollo/client';

import STUDENT_PORTFOLIO_PLANS, {
  TStudentPortfolioPlansData,
  TStudentPortfolioPlan,
  TStudentPortfolioPlansVariables,
} from '@shared/graphql/user/query/studentPortfolioPlans';

const useStudentPortfolioPlansQuery = (studentUuid?: string) => {
  if (!studentUuid)
    return {
      data: undefined,
      loading: false,
      error: undefined,
    };

  return useQuery<TStudentPortfolioPlansData, TStudentPortfolioPlansVariables>(
    STUDENT_PORTFOLIO_PLANS,
    {
      variables: {
        uuid: studentUuid,
      },
    }
  );
};

export type { TStudentPortfolioPlansData, TStudentPortfolioPlan };

export default useStudentPortfolioPlansQuery;
