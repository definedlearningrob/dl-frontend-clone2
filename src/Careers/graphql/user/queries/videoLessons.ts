import { gql } from '@apollo/client';

export default gql`
  query VideoLessons($id: ID!) {
    video(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
