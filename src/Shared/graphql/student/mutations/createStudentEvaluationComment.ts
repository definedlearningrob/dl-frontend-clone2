import { gql } from '@apollo/client';

export default gql`
  mutation CreateStudentEvaluationComment($input: CreateEvaluationCommentMutationInput!) {
    createEvaluationComment(input: $input) {
      evaluation {
        comments {
          author {
            email
            firstName
            lastName
            username
            uuid
          }
          body
          createdAt
          statement {
            id
            name
          }
        }
        id
      }
    }
  }
`;

export type TEvaluator = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  uuid: string;
};

export type TComment = {
  author: TEvaluator;
  body: string;
  createdAt: string;
  statement: {
    id: string;
    name: string;
  };
};

export type TEvaluation = {
  comments: TComment[];
};

export type TCreateStudentEvaluationCommentData = {
  createEvaluationComment: {
    evaluation: TEvaluation;
  };
};

export type TCreateStudentEvaluationCommentInput = {
  evaluationId: string;
  statementId: string;
  body: string;
};
