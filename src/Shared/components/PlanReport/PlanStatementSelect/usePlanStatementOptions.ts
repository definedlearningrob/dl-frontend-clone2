import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import { PLAN_STATEMENT_OPTIONS } from '@shared/graphql/user/query/planStatementOptions';

export const usePlanStatementOptions = (planId: string) => {
  const { data } = useQuery(PLAN_STATEMENT_OPTIONS, {
    variables: { id: planId },
    skip: isEmpty(planId),
    fetchPolicy: 'no-cache',
  });

  if (!data?.plan) {
    return [];
  }

  return data.plan.groups.map((group) => ({
    label: group.name,
    options: group.statements.map((statement) => ({
      label: statement.name,
      value: statement.id,
      isRequired: statement.isRequired,
      question: statement.question,
    })),
  }));
};
