import { gql } from '@apollo/client';

gql`
  query PublicProjectStandards($shareId: ID!, $setId: String!, $code: String!) {
    project: task(shareId: $shareId, code: $code) {
      id
      standards(setId: $setId) {
        grade
        standardNumber
        standardText
        subject
      }
    }
  }
`;
