import { gql } from '@apollo/client';

export default gql`
  query InterestsGroups {
    interestsGroups {
      category
      id
      options {
        activity
        id
        imageUrl
      }
    }
  }
`;
