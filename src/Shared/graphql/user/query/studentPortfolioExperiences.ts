import { gql } from '@apollo/client';

import { TPortfolio } from '@shared/graphql/student/query/careerExperiences';

export default gql`
  query StudentPortfolioExperiences($uuid: ID!) {
    student(uuid: $uuid) {
      portfolio {
        careerExperiences {
          clusterId
          clusterName
          submissionsCount
        }
        studentId
      }
      uuid
      fullName
    }
  }
`;

export type TStudentCareerExperiencesData = {
  student: {
    portfolio: TPortfolio;
    uuid: string;
    fullName: string;
  };
};
