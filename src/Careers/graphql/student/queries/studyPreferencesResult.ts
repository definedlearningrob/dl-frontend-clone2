import { gql } from '@apollo/client';

export default gql`
  query StudyPreferencesResult($assessmentAttemptId: ID!) {
    studyPreferencesResult(assessmentAttemptId: $assessmentAttemptId) {
      area
      description
      position
    }
  }
`;
