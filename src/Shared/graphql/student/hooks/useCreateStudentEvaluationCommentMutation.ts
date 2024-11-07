import { useMutation } from '@apollo/client';

import CREATE_STUDENT_EVALUATION_COMMENT, {
  TCreateStudentEvaluationCommentData,
  TCreateStudentEvaluationCommentInput,
} from '@shared/graphql/student/mutations/createStudentEvaluationComment';

type Props = {
  studentInput: TCreateStudentEvaluationCommentInput;
};

export const useCreateStudentEvaluationCommentMutation = () => {
  const [mutate, { error, loading }] = useMutation<TCreateStudentEvaluationCommentData>(
    CREATE_STUDENT_EVALUATION_COMMENT
  );

  const createStudentEvaluationComment = ({ studentInput }: Props) =>
    mutate({
      variables: {
        input: studentInput,
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ __typename: 'PlanGroupStatement', id: studentInput.statementId }),
          fields: {
            comments(existingComments) {
              if (!data) {
                return existingComments;
              }

              return data.createEvaluationComment.evaluation.comments.filter(
                (comment) => comment.statement.id === studentInput.statementId
              );
            },
          },
        });
      },
    });

  return [createStudentEvaluationComment, { error, loading }] as const;
};
