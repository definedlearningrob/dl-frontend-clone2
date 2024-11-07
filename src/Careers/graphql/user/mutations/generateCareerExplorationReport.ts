import { gql } from '@apollo/client';

gql`
  mutation GenerateCareerExplorationReport($input: GeneratePathwayReportMutationInput!) {
    generatePathwayReport(input: $input) {
      pathwayReport {
        id
      }
    }
  }
`;
