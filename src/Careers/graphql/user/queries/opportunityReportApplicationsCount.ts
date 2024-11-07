import { gql } from '@apollo/client';

gql`
  query OpportunityReportApplicationCount($filter: OpportunityReportFilter) {
    reports {
      opportunityReport(filter: $filter) {
        clusterCounts {
          applicationsCount
          cluster {
            id
            name
          }
          pathwayApplicationCounts {
            pathway {
              id
              name
              cluster {
                id
                name
              }
            }
            applicationsCount
          }
        }
      }
    }
  }
`;
