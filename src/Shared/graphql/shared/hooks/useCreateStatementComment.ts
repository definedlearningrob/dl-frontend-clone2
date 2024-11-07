import { useParams } from 'react-router-dom';

import { useCreateStudentEvaluationCommentMutation } from '@shared/graphql/student/hooks/useCreateStudentEvaluationCommentMutation';
import { useCreateUserEvaluationCommentMutation } from '@shared/graphql/user/hooks/useCreateUserEvaluationCommentMutation';

type Params = {
  statementId: string;
  evaluationId: string;
};

export const useCreateStatementComment = ({ evaluationId, statementId }: Params) => {
  const { id: studentUuid } = useParams<{ id?: string }>();

  const [createUserEvaluationComment, { loading: userCommentLoading }] =
    useCreateUserEvaluationCommentMutation();
  const [createStudentEvaluationComment, { loading: studentCommentLoading }] =
    useCreateStudentEvaluationCommentMutation();

  const createEvaluationComment = (comment: string) => {
    const input = {
      evaluationId,
      statementId,
      body: comment,
    };

    if (studentUuid) {
      createUserEvaluationComment({ userInput: { ...input, studentUuid } });
    } else {
      createStudentEvaluationComment({ studentInput: input });
    }
  };

  return [
    createEvaluationComment,
    { loading: userCommentLoading || studentCommentLoading },
  ] as const;
};
