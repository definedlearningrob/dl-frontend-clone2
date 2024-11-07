import { gql } from '@apollo/client';

export default gql`
  query careerExperiences {
    portfolio {
      studentId
      careerExperiences {
        clusterId
        clusterName
        submissionsCount
      }
    }
  }
`;

export type TCareerExperience = {
  clusterId: string;
  clusterName: string;
  submissionsCount: number;
};

export type TPortfolio = {
  studentId: string;
  careerExperiences: TCareerExperience[];
};

export type TCareerExperiencesData = {
  portfolio: TPortfolio;
};

export type TCareerExperiencesVariables = {
  uuid?: string;
};
