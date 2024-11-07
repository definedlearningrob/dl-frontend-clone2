import { gql } from '@apollo/client';

export default gql`
  mutation CreateAssignment($input: CreateAssignmentMutationInput!) {
    createAssignment(input: $input) {
      assignment {
        assetName
        description
        displayName
        id
        rubrics {
          id
          name
          description
        }
      }
    }
  }
`;
