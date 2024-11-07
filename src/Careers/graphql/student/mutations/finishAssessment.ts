import { gql } from '@apollo/client';

export default gql`
  mutation FinishAssessment($attemptId: ID!) {
    createAssessmentResult(input: { attemptId: $attemptId }) {
      status
    }
  }
`;
