import { useQuery } from '@apollo/client';

import STUDENT_PORTFOLIO_PROJECTS, {
  TStudentPortfolioProjectConnectionData,
  TStudentPortfolioProjectVariables,
  TPortfolioProjectsData,
} from '@shared/graphql/user/query/studentPortfolioProjects';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type StudentPortfolioProjectsQueryArgs = {
  studentUuid: string;
  type: PORTFOLIO_PROJECT_TYPES;
  first?: number;
  skip?: boolean;
};

const useStudentPortfolioQuery = ({
  studentUuid,
  type,
  first = 5,
  skip = false,
}: StudentPortfolioProjectsQueryArgs) => {
  const data = useQuery<TStudentPortfolioProjectConnectionData, TStudentPortfolioProjectVariables>(
    STUDENT_PORTFOLIO_PROJECTS,
    {
      variables: {
        uuid: studentUuid,
        type,
        first,
      },
      skip,
    }
  );

  return {
    fetchMore: data.fetchMore,
    pageInfo: data?.data?.student?.portfolio?.projects?.pageInfo,
    projects: data?.data?.student?.portfolio?.projects,
    error: data.error,
    loading: data.loading,
  };
};

export type { TStudentPortfolioProjectConnectionData, TPortfolioProjectsData };

export default useStudentPortfolioQuery;
