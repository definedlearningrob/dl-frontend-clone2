import { gql } from '@apollo/client';

import courseMetadataFragment from '@dc/graphql/fragments/courseMetadata';

export default gql`
  query StudentRecommendedCourses($uuid: ID!) {
    student(uuid: $uuid) {
      uuid
      recommendedCourses {
        id
        imageUrl
        match
        type
        name
        pathway {
          name
        }
        thumbnailUrl
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
