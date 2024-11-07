import { gql } from '@apollo/client';

import { TCheckInQuestionGrade } from '@shared/components/CheckIns/types';

export default gql`
  mutation DlCreateCheckInQuestionAnswer($input: CreateCheckInQuestionAnswerMutationInput!) {
    createCheckInQuestionAnswer(input: $input) {
      checkInQuestionAnswer {
        answer
        id
        grade {
          status
          createdAt
          updatedAt
          lastGradedBy {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export type TCreateCheckInQuestionAnswer = {
  createCheckInQuestionAnswer: {
    checkInQuestionAnswer: {
      answer: string;
      id: string;
      grade: TCheckInQuestionGrade | null;
    };
  };
};

export type TCreateCheckInQuestionAnswerMutationInput = {
  input: {
    checkInQuestionId: string;
    taskId: string;
    answer: string;
  };
};
