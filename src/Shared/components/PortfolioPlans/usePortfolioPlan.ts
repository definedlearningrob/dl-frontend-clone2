import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { countBy, orderBy, sortBy } from 'lodash-es';
import { match, P } from 'ts-pattern';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import usePlanWithEvaluationQuery from '@shared/graphql/student/hooks/usePlanWithEvaluationQuery';
import useStudentPortfolioPlanWithEvaluationQuery from '@shared/graphql/user/hooks/useStudentPortfolioPlanWithEvaluationQuery';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { useCreateUserEvaluationMutation } from '@shared/graphql/user/hooks/useCreateEvaluationMutation';
import { callToast } from '@shared/components/Toaster/Toaster';

import { usePortfolioPlans } from './usePortfolioPlans';

type Params = {
  planId?: string;
  canEvaluate: boolean;
};

export const usePortfolioPlan = ({ planId, canEvaluate }: Params) => {
  const { t } = useTranslation();
  const { id: studentUuid } = useParams<{ id?: string }>();
  const { hasMissingEvaluation } = usePortfolioPlans();

  const shouldCreateEvaluation = canEvaluate && hasMissingEvaluation;
  const studentUuidToPass = studentUuid ?? '';
  const planIdToPass = planId ?? '';

  const [createEvaluation] = useCreateUserEvaluationMutation();
  const { data: planData, loading: planLoading } = usePlanWithEvaluationQuery(planIdToPass, {
    skip: !planId || !!studentUuid || shouldCreateEvaluation,
  });
  const { data: studentPlanData, loading: studentPlanLoading } =
    useStudentPortfolioPlanWithEvaluationQuery(studentUuidToPass, planIdToPass, {
      skip: !planId || !studentUuid || shouldCreateEvaluation,
    });

  const handleCreateEvaluation = async () => {
    try {
      await createEvaluation({ input: { planId: planIdToPass, studentUuid } });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  useEffect(() => {
    if (shouldCreateEvaluation) {
      handleCreateEvaluation();
    }
  }, [shouldCreateEvaluation]);

  const normalizedPlan = useMemo(() => {
    const plan = planData?.plan || studentPlanData?.student.portfolio.plan;

    if (!plan) {
      return null;
    }

    const { evaluation, ...planFields } = plan;

    return {
      ...planFields,
      groups: sortBy(plan.groups, 'step').map((group) => {
        const groupStatements = sortBy(group.statements, 'step').map((statement) => {
          const parsedStatuses = statement.results.map((status) => {
            const { evaluator, ...statusFields } = status;

            return { ...statusFields, author: evaluator };
          });

          return {
            ...statement,
            status: statement.results[0],
            evaluationId: evaluation?.id,
            activityHistory: orderBy(
              [...statement.comments, ...parsedStatuses],
              'createdAt',
              'desc'
            ),
          };
        });

        const statementStatuses: {
          [K in EVALUATION_RESULTS_VALUES]?: number;
        } = countBy(
          groupStatements,
          (statement) => statement.status?.result ?? EVALUATION_RESULTS_VALUES.NOT_STARTED
        );

        const statementsCount = groupStatements.length;

        const status = match(statementStatuses)
          .with(
            { NOT_MET: P.when((value) => value === statementsCount) },
            () => EVALUATION_RESULTS_VALUES.NOT_MET
          )
          .with(
            { NOT_STARTED: P.when((value) => value === statementsCount) },
            () => EVALUATION_RESULTS_VALUES.NOT_STARTED
          )
          .with(
            { COMPLETED: P.when((value) => value === statementsCount) },
            () => EVALUATION_RESULTS_VALUES.COMPLETED
          )
          .otherwise(() => EVALUATION_RESULTS_VALUES.IN_PROGRESS);

        return {
          ...group,
          status,
          statements: groupStatements,
        };
      }),
    };
  }, [planData, studentPlanData]);

  return { plan: normalizedPlan, loading: planLoading || studentPlanLoading };
};
