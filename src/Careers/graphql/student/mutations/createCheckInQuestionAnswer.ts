import { gql, TypedDocumentNode } from '@apollo/client';

import { TCheckInQuestionAnswer } from '@shared/components/CheckIns/types';

export const CREATE_CHECKIN_QUESTION_ANSWER: TypedDocumentNode<
  TCreateCheckInQuestionAnswerData,
  TCreateCheckInQuestionAnswerMutationInput
> = gql`
  mutation DcCreateCheckInQuestionAnswer($input: CreateCheckInQuestionAnswerMutationInput!) {
    createCheckInQuestionAnswer(input: $input) {
      checkInQuestionAnswer {
        answer
        id
      }
    }
  }
`;

export type TCreateCheckInQuestionAnswerData = {
  createCheckInQuestionAnswer: {
    checkInQuestionAnswer: Pick<TCheckInQuestionAnswer, 'id' | 'answer'>;
  };
};

export type TCreateCheckInQuestionAnswerMutationInput = {
  input: {
    answer: string;
    checkInQuestionId: string;
    lessonId: string;
  };
};
