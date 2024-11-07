import { gql } from '@apollo/client';

export default gql`
  query ExternalPresentationsLessons($id: ID!) {
    externalPresentation(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
