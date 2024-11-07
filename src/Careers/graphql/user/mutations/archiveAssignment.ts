import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveAssignment($input: ArchiveAssignmentMutationInput!) {
    archiveAssignment(input: $input) {
      assignment {
        archivedAt
        id
      }
    }
  }
`;
