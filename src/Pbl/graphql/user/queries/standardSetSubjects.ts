import { gql } from '@apollo/client';

export default gql`
  query StandardSetSubjects($setId: String!) {
    standardSetSubjects(setId: $setId) {
      name
      grades
    }
  }
`;

export type TStandardSetSubject = {
  name: string;
  grades: string[];
};

export type StandardSetSubjectsData = {
  standardSetSubjects: TStandardSetSubject[];
};

export type StandardSetSubjectsVariables = {
  setId: string;
};
