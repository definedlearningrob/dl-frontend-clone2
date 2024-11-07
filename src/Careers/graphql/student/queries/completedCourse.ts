import { gql } from '@apollo/client';

export default gql`
  query CompletedCourse($id: ID!) {
    course(id: $id) {
      id
      lessons {
        id
        step
        careerReviewSurvey {
          performed
        }
      }
      progress {
        submitted
        total
      }
    }
  }
`;
