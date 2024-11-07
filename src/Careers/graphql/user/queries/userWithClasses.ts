import { gql } from '@apollo/client';

export default gql`
  query UserWithClasses($uuid: ID!) {
    user(uuid: $uuid) {
      email
      firstName
      lastName
      role
      uuid
      gradingNeeded
      schoolClasses(page: 1, perPage: 100) {
        nodes {
          uuid
          name
          gradingNeeded
          entity {
            name
            uuid
          }
        }
      }
    }
  }
`;
