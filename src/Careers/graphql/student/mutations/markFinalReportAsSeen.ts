import { gql } from '@apollo/client';

export default gql`
  mutation MarkFinalReportAsSeen($input: MarkFinalReportAsSeenMutationInput!) {
    markFinalReportAsSeen(input: $input) {
      status
    }
  }
`;
