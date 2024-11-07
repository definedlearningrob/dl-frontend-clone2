import { gql } from '@apollo/client';

export default gql`
  mutation DcArchiveCheckInQuestion($input: ArchiveCheckInQuestionMutationInput!) {
    archiveCheckInQuestion(input: $input) {
      checkInQuestion {
        archivedAt
        id
      }
    }
  }
`;

export type TArchiveCheckInQuestionData = {
  checkInQuestion: {
    archivedAt: string;
    id: string;
  };
};

export type TArchiveCheckInQuestionVariables = {
  id: string;
};
