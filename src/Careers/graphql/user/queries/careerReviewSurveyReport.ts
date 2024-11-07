import { gql } from '@apollo/client';

gql`
  query CareerReviewSurveyReport($filter: CareerReviewSurveyReportFilter) {
    reports {
      careerReviewSurveyReport(filter: $filter) {
        studentsCount
        studentsAnsweredCount
        questionAnswerCounts {
          question {
            id
            question
          }
          baselineCounts {
            answer
            count
          }
          currentCounts {
            answer
            count
          }
        }
      }
    }
  }
`;
