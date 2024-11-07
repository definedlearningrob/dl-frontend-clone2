import { gql } from '@apollo/client';

export default gql`
  query StudentPortfolioInfo($uuid: ID!) {
    student(uuid: $uuid) {
      uuid
      firstName
      lastName
      schoolClasses {
        uuid
        name
      }
    }
  }
`;
