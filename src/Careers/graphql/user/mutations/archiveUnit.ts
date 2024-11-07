import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveUnit($input: ArchiveUnitMutationInput!) {
    archiveUnit(input: $input) {
      unit {
        archivedAt
        description
        id
        imageUrl
        name
      }
    }
  }
`;
