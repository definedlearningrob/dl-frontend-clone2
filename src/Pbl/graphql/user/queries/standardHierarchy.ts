import { gql } from '@apollo/client';

export default gql`
  query StandardHierarchy($setId: String!, $subject: String!, $grade: String!) {
    standardsHierarchy(setId: $setId, subject: $subject, grade: $grade) {
      guid
      standardText
      standardNumber
      children {
        guid
        standardText
        standardNumber
        children {
          guid
          standardText
          standardNumber
          children {
            guid
            standardText
            standardNumber
            children {
              guid
              standardText
              standardNumber
            }
          }
        }
      }
    }
  }
`;

export type TStandardHierarchy = {
  guid: string;
  standardText: string;
  standardNumber: string;
  children: TStandardHierarchy[];
};

export type StandardsHierarchyData = {
  standardsHierarchy: TStandardHierarchy[];
};

export type StandardsHierarchyVariables = {
  setId: string;
  subject: string;
  grade: string;
};
