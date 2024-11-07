import { useLazyQuery } from '@apollo/client';

import CAREER_EXPERIENCE, {
  TCareerExperienceData,
  TCareerExperienceVariable,
} from '@shared/graphql/student/query/careerExperience';
import STUDENT_PORTFOLIO_EXPERIENCE, {
  TCareerStudentExperienceData,
  TCareerStudentExperienceVariable,
} from '@shared/graphql/user/query/studentPortfolioExperience';

export const useCareerExperienceQuery = ({ isStudent }: { isStudent: boolean }) => {
  if (isStudent) {
    const [fetchExperience, { data, loading }] = useLazyQuery<
      TCareerExperienceData,
      TCareerExperienceVariable
    >(CAREER_EXPERIENCE);

    return [fetchExperience, { data: data?.portfolio.careerExperience, loading }] as const;
  }

  const [fetchStudentExperience, { data, loading }] = useLazyQuery<
    TCareerStudentExperienceData,
    TCareerStudentExperienceVariable
  >(STUDENT_PORTFOLIO_EXPERIENCE);

  return [
    fetchStudentExperience,
    { data: data?.student.portfolio.careerExperience, loading },
  ] as const;
};
