import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { UPDATE_OPPORTUNITY_APPLICATION } from '@dc/graphql/user/mutations/updateOpportunityApplication';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

import { callToast } from '@shared/components/Toaster/Toaster';

type Params = {
  id: string;
  status: string;
};

export type AcceptedStatuses =
  | OPPORTUNITY_APPLICATION_STATUS.ACCEPTED
  | OPPORTUNITY_APPLICATION_STATUS.PENDING
  | OPPORTUNITY_APPLICATION_STATUS.REJECTED
  | OPPORTUNITY_APPLICATION_STATUS.STARTED
  | OPPORTUNITY_APPLICATION_STATUS.FINISHED
  | OPPORTUNITY_APPLICATION_STATUS.EXPIRED;

const statusToLabelKeyMap = {
  [OPPORTUNITY_APPLICATION_STATUS.ACCEPTED]: 'accepted',
  [OPPORTUNITY_APPLICATION_STATUS.FINISHED]: 'finished',
  [OPPORTUNITY_APPLICATION_STATUS.PENDING]: 'cancelled',
  [OPPORTUNITY_APPLICATION_STATUS.REJECTED]: 'rejected',
  [OPPORTUNITY_APPLICATION_STATUS.STARTED]: 'started',
  [OPPORTUNITY_APPLICATION_STATUS.EXPIRED]: 'expired',
};

export const useUpdateOpportunityApplication = () => {
  const [mutate] = useMutation(UPDATE_OPPORTUNITY_APPLICATION);
  const { t } = useTranslation();

  const updateApplication = async ({ id, status }: Params) =>
    await mutate({
      variables: {
        input: {
          id,
          status,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({
            id,
            __typename: 'OpportunityApplication',
          }),
          fields: {
            status() {
              return status;
            },
            lastChangedBy(existing) {
              return data?.updateOpportunityApplication.application.lastChangedBy ?? existing;
            },
          },
        });
      },
    });

  const updateApplicationStatus = (
    applicationId: string,
    status: OPPORTUNITY_APPLICATION_STATUS,
    // eslint-disable-next-line no-undef
    toastMessage?: JSX.Element | string
  ) => {
    const defaultToastMessage = t(
      `opportunityManageApplications.toastMessage.${statusToLabelKeyMap[status]}`
    );
    updateApplication({
      id: applicationId,
      status,
    })
      .then(() => {
        callToast('info', toastMessage || defaultToastMessage);
      })
      .catch((error) => {
        if (error instanceof ApolloError) {
          callToast('error', error.message);
        }
      });
  };

  return { updateApplicationStatus };
};
