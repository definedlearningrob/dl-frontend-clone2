import { gql } from '@apollo/client';

export default gql`
  query ProjectStandards($projectId: ID!, $setId: String!, $code: String) {
    project: task(id: $projectId, code: $code) {
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
  code?: string;
};

export type TStandard = {
  grade: string;
  standardNumber: string;
  standardText: string;
  subject: string;
};
