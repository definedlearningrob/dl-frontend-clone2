import { gql } from '@apollo/client';

export default gql`
  query TaskUnits($id: ID!) {
    task(id: $id) {
      id
      units {
        id
        name
      }
    }
  }
`;
