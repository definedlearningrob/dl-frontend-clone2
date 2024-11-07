import { gql } from '@apollo/client';

export default gql`
  mutation generateOpportunityReport($input: GenerateOpportunityReportMutationInput!) {
    generateOpportunityReport(input: $input) {
      opportunityReport {
        id
      }
    }
  }
`;
