import { gql } from '@apollo/client';

export default gql`
  query DcNotifications(
    $scope: NotificationStatus
    $type: NotificationTypes!
    $page: Int
    $perPage: Int
  ) {
    notifications(scope: $scope, type: $type, page: $page, perPage: $perPage) {
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
        type
        updatedAt
      }
    }
  }
`;
