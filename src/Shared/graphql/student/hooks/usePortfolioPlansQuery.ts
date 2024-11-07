import { useQuery } from '@apollo/client';

import PORTFOLIO_PLANS, {
  TPortfolioPlansData,
  TPortfolioPlan,
} from '@shared/graphql/student/query/portfolioPlans';

const usePortfolioPlansQuery = (studentUuid?: string) =>
  useQuery<TPortfolioPlansData>(PORTFOLIO_PLANS, { skip: !!studentUuid });

export type { TPortfolioPlansData, TPortfolioPlan };

export default usePortfolioPlansQuery;
