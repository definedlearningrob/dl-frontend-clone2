import { gql } from '@apollo/client';

export default gql`
  mutation CreateAnnouncement($input: CreateAnnouncementMutationInput!) {
    createAnnouncement(input: $input) {
      announcement {
        author {
          uuid
          firstName
          lastName
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
  }
`;
