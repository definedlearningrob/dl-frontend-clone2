import { gql } from '@apollo/client';

export default gql`
  query StudentProjectStandards($projectId: ID!, $setId: String!) {
    project: task(id: $projectId) {
      id
      standards(setId: $setId) {
        grade
        standardNumber
        standardText
        subject
      }
    }
  }
`;

export type TProjectStandardsData = {
  project: {
    id: string;
    standards: TStandard[];
  };
};

export type TProjectStandardsVariables = {
  projectId: string;
  setId: string;
};

export type TStandard = {
  grade: string;
  standardNumber: string;
  standardText: string;
  subject: string;
};
