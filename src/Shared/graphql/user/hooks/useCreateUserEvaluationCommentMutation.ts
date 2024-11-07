import { useMutation } from '@apollo/client';

import CREATE_USER_EVALUATION_COMMENT, {
  TCreateUserEvaluationCommentData,
  TCreateUserEvaluationCommentInput,
} from '@shared/graphql/user/mutations/createUserEvaluationComment';

type Props = {
  userInput: TCreateUserEvaluationCommentInput;
};

export const useCreateUserEvaluationCommentMutation = () => {
  const [mutate, { error, loading }] = useMutation<TCreateUserEvaluationCommentData>(
    CREATE_USER_EVALUATION_COMMENT
  );

  const createUserEvaluationComment = ({ userInput }: Props) =>
    mutate({
      variables: { input: userInput },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ __typename: 'PlanGroupStatement', id: userInput.statementId }),
          fields: {
            comments(existingComments) {
              if (!data) {
                return existingComments;
              }

              return data.createEvaluationComment.evaluation.comments.filter(
                (comment) => comment.statement.id === userInput.statementId
              );
            },
          },
        });
      },
    });

  return [createUserEvaluationComment, { error, loading }] as const;
};
