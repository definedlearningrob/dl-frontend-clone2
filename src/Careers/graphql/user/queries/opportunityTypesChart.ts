import { gql } from '@apollo/client';

gql`
  query OpportunityReportTypesChart($filter: OpportunityReportFilter) {
    reports {
      opportunityReport(filter: $filter) {
        typeCounts {
          applicationsCount
          opportunityType
        }
      }
    }
  }
`;
