import { useQuery } from '@apollo/client';

import STUDENT_PORTFOLIO_RESUMES, {
  TStudentPortfolioResumesData,
  TStudentPortfolioResumesVariables,
} from '@shared/graphql/user/query/studentPortfolioResumes';

const useStudentPortfolioResumesQuery = (studentUuid: string) =>
  useQuery<TStudentPortfolioResumesData, TStudentPortfolioResumesVariables>(
    STUDENT_PORTFOLIO_RESUMES,
    {
      variables: {
        uuid: studentUuid,
      },
    }
  );

export default useStudentPortfolioResumesQuery;
