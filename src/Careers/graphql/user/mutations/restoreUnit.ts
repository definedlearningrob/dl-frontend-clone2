import { gql } from '@apollo/client';

export default gql`
  mutation RestoreUnit($input: RestoreUnitMutationInput!) {
    restoreUnit(input: $input) {
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
