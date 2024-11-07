import { gql } from '@apollo/client';

export default gql`
  mutation ArchivePlanGroup($input: ArchivePlanGroupMutationInput!) {
    archivePlanGroup(input: $input) {
      planGroup {
        archivedAt
        id
      }
    }
  }
`;
