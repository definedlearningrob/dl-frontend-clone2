import { gql } from '@apollo/client';

export default gql`
  query FinishedAssessmentStatus {
    assessmentProgress(scope: FINISHED) {
      attempt {
        id
        status
      }
    }
  }
`;
