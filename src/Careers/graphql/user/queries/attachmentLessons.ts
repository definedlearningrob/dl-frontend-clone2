import { gql } from '@apollo/client';

export default gql`
  query AttachmentLessons($id: ID!) {
    attachment(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
