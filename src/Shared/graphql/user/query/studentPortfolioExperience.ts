import { gql } from '@apollo/client';

import { TSubmission } from '@shared/graphql/student/query/careerExperience';

export default gql`
  query StudentPortfolioExperience($uuid: ID!, $id: ID!) {
    student(uuid: $uuid) {
      portfolio {
        careerExperience(id: $id) {
          submissions {
            service
            submissionName
            contextName
            submittedAt
            isTeamSubmission
          }
        }
        studentId
      }
      uuid
    }
  }
`;

export type TCareerStudentExperienceData = {
  student: {
    portfolio: {
      careerExperience: {
        submissions: TSubmission[];
      };
    };
    uuid: string;
  };
};

export type TCareerStudentExperienceVariable = {
  id: string;
  uuid: string;
};
