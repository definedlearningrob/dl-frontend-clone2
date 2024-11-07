import { gql } from '@apollo/client';

export default gql`
  mutation DlArchiveCheckInQuestion($input: ArchiveCheckInQuestionMutationInput!) {
    archiveCheckInQuestion(input: $input) {
      checkInQuestion {
        id
      }
    }
  }
`;

export type TArchiveCheckInQuestionData = {
  archiveCheckInQuestion: {
    checkInQuestion: {
      id: string;
    };
  };
};

export type TArchiveCheckInQuestionVariables = {
  input: {
    id: string;
  };
};
