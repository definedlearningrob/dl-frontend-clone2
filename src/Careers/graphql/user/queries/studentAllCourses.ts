import { gql } from '@apollo/client';

import courseMetadataFragment from '@dc/graphql/fragments/courseMetadata';

export default gql`
  query StudentAllCourses($uuid: ID!, $filter: StudentCourseFilter, $page: Int, $perPage: Int) {
    student(uuid: $uuid) {
      assessmentCompleted
      uuid
      allCourses(filter: $filter, page: $page, perPage: $perPage) {
        nodes {
          id
          imageUrl
          match
          name
          type
          pathway {
            name
          }
          thumbnailUrl
          collection {
            id
            name
          }
          isRecommended
          isEnrolled
          ...CourseMetadata
        }
        pagesCount
      }
    }
  }
  ${courseMetadataFragment}
`;
