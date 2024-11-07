import { gql } from '@apollo/client';

export default gql`
  mutation ArchivePlanGroupStatement($input: ArchivePlanGroupStatementMutationInput!) {
    archivePlanGroupStatement(input: $input) {
      planGroupStatement {
        archivedAt
        id
      }
    }
  }
`;
