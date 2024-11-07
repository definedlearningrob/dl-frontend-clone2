import { gql } from '@apollo/client';

import { ServiceName } from '@shared/components/ExperiencesPanel/types';

export default gql`
  query careerExperience($id: ID!) {
    portfolio {
      studentId
      careerExperience(id: $id) {
        submissions {
          service
          submissionName
          contextName
          submittedAt
          isTeamSubmission
        }
      }
    }
  }
`;

export type TCareerExperienceData = {
  portfolio: {
    careerExperience: TSubmissions;
  };
};

export type TCareerExperienceVariable = {
  id: string;
};

export type TSubmissions = {
  submissions: TSubmission[];
};

export type TSubmission = {
  service: ServiceName;
  submissionName: string;
  contextName: string;
  submittedAt: string;
  isTeamSubmission: boolean;
};
