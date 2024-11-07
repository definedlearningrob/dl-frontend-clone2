import { gql } from '@apollo/client';

export default gql`
  mutation UpdateLtiResourceGrade($input: UpdateLtiResourceGradeMutationInput!) {
    updateLtiResourceGrade(input: $input) {
      ltiResource {
        ltiResourceLinkId
      }
    }
  }
`;
