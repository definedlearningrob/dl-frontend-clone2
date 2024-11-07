import { gql } from '@apollo/client';

export default gql`
  mutation MarkOnboardingAsCompleted($input: MarkOnboardingAsCompletedMutationInput!) {
    markOnboardingAsCompleted(input: $input) {
      status
    }
  }
`;
