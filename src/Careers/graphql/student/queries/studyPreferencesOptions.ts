import { gql } from '@apollo/client';

export default gql`
  query StudyPreferencesOptions {
    studyPreferencesOptions {
      area
      description
      id
    }
  }
`;
