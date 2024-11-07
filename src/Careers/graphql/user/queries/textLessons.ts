import { gql } from '@apollo/client';

export default gql`
  query TextLessons($id: ID!) {
    text(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
