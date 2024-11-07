import { gql } from '@apollo/client';

gql`
  query CheckInsOverview($id: ID!) {
    task(id: $id) {
      id
      name
      checkInQuestions {
        id
        question
      }
    }
  }
`;
