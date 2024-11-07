import { gql } from '@apollo/client';

export default gql`
  query AdminEntityHasChildren($uuid: ID!) {
    adminDashboard {
      entity(uuid: $uuid) {
        hasChildren
        uuid
      }
      userId
    }
  }
`;
