import { gql } from '@apollo/client';

export default gql`
  query AdminUsername($uuid: ID!) {
    user(uuid: $uuid) {
      firstName
      lastName
      uuid
    }
  }
`;
