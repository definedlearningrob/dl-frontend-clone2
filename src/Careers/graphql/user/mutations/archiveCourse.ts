import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveCourse($input: ArchiveCourseMutationInput!) {
    archiveCourse(input: $input) {
      course {
        archivedAt
        id
      }
    }
  }
`;
