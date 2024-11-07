import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAssignment($input: UpdateAssignmentMutationInput!) {
    updateAssignment(input: $input) {
      assignment {
        assetName
        badges {
          id
          name
          imageUrl
        }
        description
        displayName
        id
        rubrics {
          id
          description
          name
        }
      }
    }
  }
`;
