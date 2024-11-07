import { gql, TypedDocumentNode } from '@apollo/client';

import { TCheckInQuestionAnswer } from '@pbl/components/Project/types';

export const UPDATE_CHECKIN_QUESTION_ANSWER: TypedDocumentNode<
  TUpdateCheckInQuestionAnswerData,
  TUpdateCheckInQuestionAnswerMutationInput
> = gql`
  mutation DcUpdateCheckInQuestionAnswer($input: UpdateCheckInQuestionAnswerMutationInput!) {
    updateCheckInQuestionAnswer(input: $input) {
      checkInQuestionAnswer {
        answer
        id
      }
    }
  }
`;

export type TUpdateCheckInQuestionAnswerData = {
  updateCheckInQuestionAnswer: {
    checkInQuestionAnswer: Pick<TCheckInQuestionAnswer, 'id' | 'answer'>;
    clientMutationId?: string;
  };
};

export type TUpdateCheckInQuestionAnswerMutationInput = {
  input: {
    id: string;
    answer: string;
  };
};
