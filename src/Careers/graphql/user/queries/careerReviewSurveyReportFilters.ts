import { gql } from '@apollo/client';

export const CAREER_REVIEW_SURVEY_REPORT_FILTERS = gql`
  query CareerReviewSurveyReportFilters(
    $filters: ReportFiltersFilter
    $entityFilter: EntityFilter
    $userFilter: UserFilter
    $schoolClassFilter: SchoolClassFilter
  ) {
    careerReviewSurveyReportFilters(filters: $filters) {
      entities(filter: $entityFilter, perPage: 100) {
        nodesCount
        pagesCount
        nodes {
          uuid
          name
        }
      }
      gradeLevels
      users(filter: $userFilter, perPage: 100) {
        nodesCount
        pagesCount
        nodes {
          uuid
          fullName
        }
      }
      schoolClasses(filter: $schoolClassFilter, perPage: 100) {
        nodesCount
        pagesCount
        nodes {
          uuid
          name
          users(perPage: 100) {
            nodes {
              fullName
            }
          }
        }
      }
    }
  }
`;
