import { gql } from '@apollo/client';

import courseMetadataFragment from '@dc/graphql/fragments/courseMetadata';

export default gql`
  mutation CreateCourse($input: CreateCourseMutationInput!) {
    createCourse(input: $input) {
      course {
        description
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
