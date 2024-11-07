import { useQuery } from '@apollo/client';

import portfolioResumesQuery, {
  TPortfolioResumesData,
} from '@shared/graphql/student/query/portfolioResumes';

const usePortfolioResumesQuery = () => useQuery<TPortfolioResumesData>(portfolioResumesQuery);

export default usePortfolioResumesQuery;
