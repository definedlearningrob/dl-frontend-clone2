import { gql } from '@apollo/client';

gql`
  query StandardSets($code: String!) {
    standardSets(code: $code) {
      name
      setId
    }
  }
`;
