import { gql } from '@apollo/client';

export default gql`
  query Students($page: Int, $perPage: Int, $filter: StudentFilter, $scope: ArchivableStatus) {
    students(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
      nodes {
        uuid
        firstName
        lastName
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
