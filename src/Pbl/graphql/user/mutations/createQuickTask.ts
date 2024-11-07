import { gql } from '@apollo/client';

gql`
  mutation CreateQuickTask($input: CreateQuickTaskMutationInput!) {
    createQuickTask(input: $input) {
      task {
        id
      }
    }
  }
`;
