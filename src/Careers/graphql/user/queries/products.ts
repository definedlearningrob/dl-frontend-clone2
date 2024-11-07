import { gql } from '@apollo/client';

export default gql`
  query Products(
    $scope: ArchivableStatus
    $filter: ProductFilter
    $page: Int
    $perPage: Int
    $withCopies: Boolean
  ) {
    products(
      scope: $scope
      filter: $filter
      page: $page
      perPage: $perPage
      withCopies: $withCopies
    ) {
      nodes {
        archivedAt
        description
        displayName
        id
        name
        rubricsUrl
        status
        owner {
          name
          uuid
        }
      }
      nodesCount
      pagesCount
    }
  }
`;
