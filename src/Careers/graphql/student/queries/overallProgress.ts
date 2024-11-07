import { gql } from '@apollo/client';

export default gql`
  query OverallProgress {
    overallProgress {
      assessmentFinished
      courseCompleted
      enrolledInCourse
      finalReportSeen
    }
  }
`;
