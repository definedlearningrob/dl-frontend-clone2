import { gql } from '@apollo/client';

gql`
  query OpportunityReportSummary($filter: OpportunityReportFilter) {
    reports {
      opportunityReport(filter: $filter) {
        studentsCount
        summary {
          opportunitiesCount
          virtualInternshipsCount
        }
      }
    }
  }
`;
