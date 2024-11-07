import { gql } from '@apollo/client';

import courseMetadataFragment from '@dc/graphql/fragments/courseMetadata';

export default gql`
  mutation UpdateCourse($input: UpdateCourseMutationInput!) {
    updateCourse(input: $input) {
      course {
        description
        displayName
        id
        imageUrl
        name
        collection {
          id
          name
        }
        ...CourseMetadata
      }
    }
  }
  ${courseMetadataFragment}
`;
