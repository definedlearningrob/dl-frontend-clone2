import { gql } from '@apollo/client';

export default gql`
  query PlanGroups($page: Int, $perPage: Int, $scope: ArchivableStatus, $filter: PlanGroupFilter) {
    planGroups(page: $page, perPage: $perPage, scope: $scope, filter: $filter) {
      nodes {
        archivedAt
        description
        displayName
        id
        name
        statements {
          id
          name
        }
      }
      nodesCount
      pagesCount
    }
  }
`;
