import { gql } from '@apollo/client';

export default gql`
  query InterestsResult($assessmentAttemptId: ID!) {
    interestsResult(assessmentAttemptId: $assessmentAttemptId) {
      interest
      score
    }
  }
`;
