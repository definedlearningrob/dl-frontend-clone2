import { gql } from '@apollo/client';

export default gql`
  mutation UpdatePlanGroup($input: UpdatePlanGroupMutationInput!) {
    updatePlanGroup(input: $input) {
      planGroup {
        description
        displayName
        id
        name
        statements {
          id
          step
        }
      }
    }
  }
`;
