import { useQuery } from '@apollo/client';

import PORTFOLIO_PROJECTS, {
  TPortfolioProjectConnectionData,
  TPortfolioProjectVariables,
} from '@shared/graphql/student/query/portfolioProjects';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type PortfolioProjectsQueryArgs = {
  type: PORTFOLIO_PROJECT_TYPES;
  first?: number;
  skip?: boolean;
};

const usePortfolioProjectsQuery = ({
  type,
  first = 5,
  skip = false,
}: PortfolioProjectsQueryArgs) => {
  const data = useQuery<TPortfolioProjectConnectionData, TPortfolioProjectVariables>(
    PORTFOLIO_PROJECTS,
    {
      variables: {
        first,
        type,
      },
      skip,
    }
  );

  return {
    fetchMore: data.fetchMore,
    pageInfo: data?.data?.portfolio.projects?.pageInfo,
    projects: data?.data?.portfolio?.projects,
    error: data.error,
    loading: data.loading,
  };
};

export type { TPortfolioProjectConnectionData };

export default usePortfolioProjectsQuery;
