import { gql } from '@apollo/client';

export default gql`
  mutation ArchivePlan($input: ArchivePlanMutationInput!) {
    archivePlan(input: $input) {
      plan {
        archivedAt
        id
      }
    }
  }
`;
