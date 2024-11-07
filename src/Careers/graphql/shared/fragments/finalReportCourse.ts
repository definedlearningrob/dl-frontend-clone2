import { gql } from '@apollo/client';

export default gql`
  fragment FinalReportCourse on Course {
    id
    assignments {
      id
      displayName
      submission {
        id
        files {
          id
          filename
          url(options: { responseContentDisposition: "attachment" })
        }
      }
    }
    name
    description
    pathway {
      name
      cluster {
        name
      }
    }
    reviewSurvey {
      questions {
        id
        answer
        question
      }
    }
  }
`;
