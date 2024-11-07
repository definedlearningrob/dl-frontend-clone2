import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { callToast } from '@shared/components/Toaster/Toaster';
import { ALIGN_PLAN_GROUP_STATEMENT_TO_RUBRIC_HEADING } from '@shared/graphql/user/mutations/alignPlanGroupStatementToRubricHeading';

export const useAlignPlanGroupStatementToRubricHeading = () => {
  const [mutate, { loading }] = useMutation(ALIGN_PLAN_GROUP_STATEMENT_TO_RUBRIC_HEADING);
  const { t } = useTranslation();

  const alignPlanGroupStatementToRubricHeading = async (
    planGroupStatementIds: string[],
    rubricHeadingId: string
  ) => {
    try {
      await mutate({
        variables: {
          input: {
            planGroupStatementIds,
            rubricHeadingId,
          },
          rubricHeadingId,
        },
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { alignPlanGroupStatementToRubricHeading, loading };
};
