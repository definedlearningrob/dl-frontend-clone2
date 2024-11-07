import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveLesson($input: ArchiveLessonMutationInput!) {
    archiveLesson(input: $input) {
      lesson {
        id
        archivedAt
      }
    }
  }
`;
