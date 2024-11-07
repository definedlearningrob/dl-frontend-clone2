import { gql } from '@apollo/client';

export default gql`
  query Announcement($id: ID!) {
    announcement(id: $id) {
      author {
        email
        firstName
        lastName
        username
        uuid
      }
      body
      createdAt
      id
      name
      target {
        name
        uuid
      }
    }
  }
`;
