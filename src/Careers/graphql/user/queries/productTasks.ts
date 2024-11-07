import { gql } from '@apollo/client';

export default gql`
  query ProductTasks($id: ID!) {
    product(id: $id) {
      id
      tasks {
        id
        name
      }
    }
  }
`;
