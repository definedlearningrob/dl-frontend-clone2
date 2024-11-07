import { gql } from '@apollo/client';

export default gql`
  query AllCourses($filter: StudentCourseFilter, $page: Int, $perPage: Int) {
    allCourses(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        id
        imageUrl
        thumbnailUrl
        match
        name
        pathway {
          name
        }
        type
        collection {
          id
          name
        }
        metadata {
          alternativeTitles
          averageSalary
          jobZone
          onetCode
          outlook
        }
        collection {
          id
          name
        }
        isRecommended
        isEnrolled
      }
      pagesCount
    }
  }
`;
