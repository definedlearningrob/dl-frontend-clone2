import { useQuery } from '@apollo/client';

import CAREER_EXPERIENCES, {
  TCareerExperiencesData,
  TCareerExperiencesVariables,
} from '@shared/graphql/student/query/careerExperiences';
import STUDENT_PORTFOLIO_EXPERIENCES, {
  TStudentCareerExperiencesData,
} from '@shared/graphql/user/query/studentPortfolioExperiences';

const useCareerExperiences = (uuid?: string) => {
  if (uuid) {
    const { data, loading } = useQuery<TStudentCareerExperiencesData, TCareerExperiencesVariables>(
      STUDENT_PORTFOLIO_EXPERIENCES,
      {
        variables: {
          uuid,
        },
      }
    );

    return {
      data: data?.student.portfolio.careerExperiences,
      studentName: data?.student.fullName,
      loading,
    } as const;
  }

  const { data, loading } = useQuery<TCareerExperiencesData>(CAREER_EXPERIENCES);

  return { data: data?.portfolio.careerExperiences, loading } as const;
};

export default useCareerExperiences;
