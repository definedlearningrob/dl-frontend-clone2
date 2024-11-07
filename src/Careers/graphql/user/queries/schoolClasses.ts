import { gql } from '@apollo/client';

export default gql`
  query SchoolClasses($filter: SchoolClassFilter, $perPage: Int, $page: Int) {
    schoolClasses(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        name
        uuid
        entity {
          uuid
          name
        }
      }
      nodesCount
      pagesCount
    }
  }
`;
