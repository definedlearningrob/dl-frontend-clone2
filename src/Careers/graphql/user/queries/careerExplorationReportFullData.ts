import { gql } from '@apollo/client';

gql`
  query CareerExplorationReportFullData(
    $filter: PathwayReportFilter
    $resultsFilter: PathwayVisitResultFilter
    $page: Int
    $perPage: Int
  ) {
    reports {
      pathwayReport(filter: $filter) {
        visitResults(filter: $resultsFilter, page: $page, perPage: $perPage) {
          nodesCount
          pagesCount
          nodes {
            clusterNames
            isEnrolled
            pathwayNames
            resourceId
            resourceName
            resourceType
            visitorEmail
            visitorId
            visitorName
            visitorSisId
            visitorType
            visitsCount
          }
        }
      }
    }
  }
`;
