import { gql } from '@apollo/client';

export default gql`
  mutation CreateUserEvaluationComment($input: CreateEvaluationCommentMutationInput!) {
    createEvaluationComment(input: $input) {
      evaluation {
        comments {
          author {
            firstName
            lastName
            uuid
          }
          body
          createdAt
          statement {
            id
          }
        }
        id
      }
    }
  }
`;

export type TEvaluator = {
  firstName: string;
  lastName: string;
  uuid: string;
};

export type TComment = {
  author: TEvaluator;
  body: string;
  createdAt: string;
  statement: {
    id: string;
  };
};

export type TEvaluation = {
  comments: TComment[];
};

export type TCreateUserEvaluationCommentData = {
  createEvaluationComment: {
    evaluation: TEvaluation;
  };
};

export type TCreateUserEvaluationCommentInput = {
  studentUuid: string;
  evaluationId: string;
  statementId: string;
  body: string;
};
