import { gql } from '@apollo/client';

gql`
  query PlanProgress {
    plans {
      id
      name
      progress {
        completed
        total
      }
    }
  }
`;
