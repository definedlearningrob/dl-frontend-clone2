import { gql } from '@apollo/client';

export default gql`
  query ResearchLinkLessons($id: ID!) {
    researchLink(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
