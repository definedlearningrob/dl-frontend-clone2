import { gql } from '@apollo/client';

gql`
  query OpportunityReportFullData(
    $filter: OpportunityReportFilter
    $resultsFilter: OpportunityApplicationResultFilter
    $page: Int
    $perPage: Int
  ) {
    reports {
      opportunityReport(filter: $filter) {
        results(filter: $resultsFilter, page: $page, perPage: $perPage) {
          nodesCount
          pagesCount
          nodes {
            applicationDeadline
            applicationStatus
            assignmentsSubmitted
            assignmentsToSubmit
            checkInsSubmitted
            checkInsToSubmit
            clusterNames
            isFavorite
            opportunityName
            opportunityPartnerNames
            opportunityType
            pathwayNames
            studentGradeLevel
            studentId
            studentName
            studentSisId
          }
        }
      }
    }
  }
`;
