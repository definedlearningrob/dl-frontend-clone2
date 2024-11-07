import { gql } from '@apollo/client';

export default gql`
  query WorkValuesResult($assessmentAttemptId: ID!) {
    workValuesResult(assessmentAttemptId: $assessmentAttemptId) {
      score
      workValue
    }
  }
`;
