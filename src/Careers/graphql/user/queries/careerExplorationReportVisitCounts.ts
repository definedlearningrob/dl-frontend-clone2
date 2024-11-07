import { gql } from '@apollo/client';

gql`
  query CareerExplorationReportVisitCounts($filter: PathwayReportFilter) {
    reports {
      pathwayReport(filter: $filter) {
        visitCounts {
          visitsCount
          cluster {
            name
            id
          }
          pathwayVisitCounts {
            visitsCount
            pathway {
              cluster {
                name
                id
              }
              id
              name
            }
          }
        }
      }
    }
  }
`;
