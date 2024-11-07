import { TypedDocumentNode, gql } from '@apollo/client';

export const ANSWER_STATEMENT_QUESTION: TypedDocumentNode<
  TAnswerStatementQuestionData,
  TAnswerStatementQuestionMutationInput
> = gql`
  mutation AnswerPlanGroupStatementQuestion(
    $input: AnswerPlanGroupStatementQuestionMutationInput!
  ) {
    answerPlanGroupStatementQuestion(input: $input) {
      answer {
        id
        answer
      }
    }
  }
`;

export type TAnswerStatementQuestionMutationInput = {
  input: {
    answer: string[];
    evaluationId: string;
    questionId: string;
  };
};

export type TAnswerStatementQuestionData = {
  answerPlanGroupStatementQuestion: {
    answer: {
      id: string;
      answer: string[];
    };
  };
};
