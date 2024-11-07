import { gql } from '@apollo/client';

export default gql`
  query WorkValuesPairs {
    workValuesPairs {
      id
      options {
        category
        id
        value
      }
    }
  }
`;
