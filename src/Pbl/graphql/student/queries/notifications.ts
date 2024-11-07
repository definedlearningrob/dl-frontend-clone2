import { gql } from '@apollo/client';

export default gql`
  query DlNotifications($scope: NotificationStatus, $page: Int, $perPage: Int) {
    notifications(scope: $scope, page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        actor {
          firstName
          lastName
          uuid
        }
        body
        id
        read
        target {
          id
        }
        updatedAt
      }
    }
  }
`;
