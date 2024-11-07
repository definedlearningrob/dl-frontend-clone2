import { gql } from '@apollo/client';

gql`
  query CareerExplorationReportSummary($filter: PathwayReportFilter) {
    reports {
      pathwayReport(filter: $filter) {
        summary {
          engagementsCount
          clustersCount
          pathwaysCount
          studentsCount
          usersCount
        }
      }
    }
  }
`;
