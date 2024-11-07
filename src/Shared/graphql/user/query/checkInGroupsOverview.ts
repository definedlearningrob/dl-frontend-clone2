import { gql } from '@apollo/client';

gql`
  query CheckInGroupsOverview($id: ID!) {
    task(id: $id) {
      id
      name
      checkInGroups {
        id
        name
        displayName
      }
    }
  }
`;
