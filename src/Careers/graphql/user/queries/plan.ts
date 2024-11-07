import { gql } from '@apollo/client';

export default gql`
  query Plan($id: ID!) {
    plan(id: $id) {
      archivedAt
      description
      id
      name
      groups {
        archivedAt
        description
        displayName
        id
        name
        step
        statements {
          id
          name
          step
        }
      }
    }
  }
`;
