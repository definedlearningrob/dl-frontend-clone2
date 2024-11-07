import { gql } from '@apollo/client';

export default gql`
  query PlanGroup($id: ID!) {
    planGroup(id: $id) {
      description
      displayName
      id
      name
      statements {
        archivedAt
        id
        name
        step
        isRequired
        question {
          text
          questionType
          options {
            option
            step
          }
        }
      }
    }
  }
`;
