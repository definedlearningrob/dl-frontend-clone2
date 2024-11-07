import { gql } from '@apollo/client';

export default gql(`
  mutation CreatePlanGroup($input: CreatePlanGroupMutationInput!) {
    createPlanGroup (input: $input) {
      planGroup {
        id,
        description,
        displayName,
        name,
      }
    }
  }
`);
