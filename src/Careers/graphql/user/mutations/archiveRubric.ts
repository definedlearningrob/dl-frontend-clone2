import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveRubric($input: ArchiveRubricMutationInput!) {
    archiveRubric(input: $input) {
      rubric {
        archivedAt
        id
      }
    }
  }
`;
