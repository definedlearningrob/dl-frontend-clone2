import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveCheckInGroup($input: ArchiveCheckInGroupMutationInput!) {
    archiveCheckInGroup(input: $input) {
      checkInGroup {
        archivedAt
        id
      }
    }
  }
`;

export type TArchiveCheckInQuestionData = {
  checkInGroup: {
    archivedAt: string;
    id: string;
  };
};

export type TArchiveCheckInQuestionVariables = {
  id: string;
};
