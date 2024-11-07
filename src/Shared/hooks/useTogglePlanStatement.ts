import { useApolloClient, useMutation } from '@apollo/client';

import LOCK_STATEMENT from '@dc/graphql/user/mutations/lockStatement';
import UNLOCK_STATEMENT from '@dc/graphql/user/mutations/unlockStatement';

import { PLAN_FRAGMENT, TPlan } from '@shared/graphql/user/fragments/plan';

type Params = {
  isLocked: boolean;
};

type MutationVariables = {
  input: { studentUuid: string; statementId: string };
  planId: string;
};

export const useTogglePlanStatement = ({ isLocked }: Params) => {
  const client = useApolloClient();
  const [lockStatement, { error: lockStatementError }] = useMutation(LOCK_STATEMENT);
  const [unlockStatement, { error: unlockStatementError }] = useMutation(UNLOCK_STATEMENT);

  const toggleStatement = async ({ input, planId }: MutationVariables) => {
    const mutate = isLocked ? unlockStatement : lockStatement;
    const mutationName = isLocked ? 'unlockStatement' : 'lockStatement';

    await mutate({
      variables: { input, planId },
      optimisticResponse: () => {
        const plan = client.readFragment<TPlan>({
          id: `Plan:${planId}`,
          fragment: PLAN_FRAGMENT,
        });

        const updatedGroups = plan!.groups.map((group) => ({
          ...group,
          statements: group.statements.map((statement) => ({
            ...statement,
            isLocked: statement.id === input.statementId ? !isLocked : statement.isLocked,
          })),
        }));

        return {
          [mutationName]: {
            student: {
              uuid: input.studentUuid,
              plan: {
                __typename: 'Plan',
                groups: updatedGroups,
              },
            },
          },
        };
      },
    });
  };

  return [toggleStatement, { error: lockStatementError || unlockStatementError }] as const;
};
