import { gql } from '@apollo/client';

gql`
  query CareerReviewSurveyReportResults(
    $filter: CareerReviewSurveyReportFilter
    $resultsFilter: CareerReviewSurveyReportResultFilter
    $sort: CareerReviewSurveyReportResultSortAttributes
    $page: Int
    $perPage: Int
  ) {
    reports {
      careerReviewSurveyReport(filter: $filter) {
        results(filter: $resultsFilter, sort: $sort, page: $page, perPage: $perPage) {
          nodes {
            answers {
              question {
                id
                question
              }
              answer {
                type
                value
              }
            }
            studentSisId
            studentName
            contextType
            contextName
            takeNumber
            isCurrent
            isBaseline
            takenAt
          }
          nodesCount
          pagesCount
        }
      }
    }
  }
`;
