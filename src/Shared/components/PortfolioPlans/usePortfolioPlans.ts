import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import usePortfolioPlansQuery from '@shared/graphql/student/hooks/usePortfolioPlansQuery';
import useStudentPortfolioPlansQuery from '@shared/graphql/user/hooks/useStudentPortfolioPlansQuery';
import useQueryParams from '@shared/hooks/useQueryParams';

export const usePortfolioPlans = () => {
  const { id: studentUuid } = useParams<{ id?: string }>();
  const { data, ...options } = usePortfolioPlansQuery(studentUuid);
  const { data: studentData, ...studentOptions } = useStudentPortfolioPlansQuery(studentUuid);
  const {
    params: { planId },
  } = useQueryParams<{ planId?: string }>();

  const plansData = useMemo(
    () => (studentUuid ? studentData?.student : data),
    [studentUuid, data, studentData]
  );

  const planOptions = useMemo(
    () => plansData?.portfolio.plans.map((plan) => ({ label: plan.name, value: plan.id })),
    [plansData]
  );

  const studentInfo = useMemo(() => {
    if (!studentData) {
      return null;
    }
    const { firstName, lastName } = studentData.student;

    return { firstName, lastName };
  }, [studentData]);

  const hasMissingEvaluation = useMemo(() => {
    if (!plansData) {
      return false;
    }

    const selectedPlan = plansData.portfolio.plans.find((plan) => plan.id === planId);

    return selectedPlan && !selectedPlan.evaluation;
  }, [plansData, planId]);

  return {
    planOptions,
    loading: options.loading || studentOptions.loading,
    student: studentInfo,
    hasMissingEvaluation,
  };
};
