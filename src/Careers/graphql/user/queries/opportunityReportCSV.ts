import { gql } from '@apollo/client';

gql`
  query OpportunityReportCSV($id: ID!) {
    opportunityReport(id: $id) {
      id
      url(options: { responseContentDisposition: "attachment" })
      uploadStatus
    }
  }
`;
