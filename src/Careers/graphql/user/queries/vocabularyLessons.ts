import { gql } from '@apollo/client';

export default gql`
  query VocabularyLessons($id: ID!) {
    vocabulary(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
