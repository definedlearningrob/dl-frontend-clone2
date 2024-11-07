import { useMutation } from '@apollo/client';
import { match } from 'ts-pattern';

import EVALUATE_STUDENT, {
  TEvaluateStudentData,
} from '@shared/graphql/shared/mutations/evaluateStudent';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';

type Params = {
  studentUuid?: string;
  evaluationId: string;
  statementId: string;
};

type MutationParams = {
  result: EVALUATION_RESULTS_VALUES;
  previousResult?: EVALUATION_RESULTS_VALUES | null;
  planId: string;
  isStatementRequired: boolean;
};

export const useEvaluateStudentMutation = ({ studentUuid, evaluationId, statementId }: Params) => {
  const [mutate, { error, loading }] = useMutation<TEvaluateStudentData>(EVALUATE_STUDENT);

  const evaluateStudent = ({
    result,
    planId,
    previousResult,
    isStatementRequired,
  }: MutationParams) =>
    mutate({
      variables: {
        input: {
          evaluationId,
          studentUuid,
          results: [{ statementId, result }],
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ __typename: 'PlanGroupStatement', id: statementId }),
          fields: {
            results(existingStatuses = []) {
              const newStatus = data?.evaluateStudent.evaluation.results.find(
                (result) => result.statement.id === statementId
              );

              if (!newStatus) {
                return existingStatuses;
              }

              return [newStatus, ...existingStatuses];
            },
          },
        });
        cache.modify({
          id: cache.identify({ __typename: 'Plan', id: planId }),
          fields: {
            progress(existingProgress = {}) {
              const completed = match({ isStatementRequired, result, previousResult })
                .with({ isStatementRequired: false }, () => existingProgress.completed)
                .with(
                  { result: EVALUATION_RESULTS_VALUES.COMPLETED },
                  () => existingProgress.completed + 1
                )
                .with(
                  { previousResult: EVALUATION_RESULTS_VALUES.COMPLETED },
                  () => existingProgress.completed - 1
                )
                .otherwise(() => existingProgress.completed);

              return {
                ...existingProgress,
                completed,
              };
            },
          },
        });
      },
    });

  return [evaluateStudent, { error, loading }] as const;
};
