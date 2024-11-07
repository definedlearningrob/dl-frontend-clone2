import { useMutation, useApolloClient, RefetchQueriesInclude, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';

import { COMMON_APP_SYNC_STATUS } from '@dc/graphql/student/queries/commonAppSyncStatus';
import { SYNC_STATUS } from '@dc/resources/enums';
import { SYNC_COMMON_APP_DATA_MUTATION } from '@dc/graphql/shared/mutations/syncCommonAppData';
import useUserInfo from '@dc/hooks/useUserInfo';

import { callToast } from '@shared/components/Toaster/Toaster';

export function useSyncCommonAppData(queriesToRefetch?: RefetchQueriesInclude) {
  const { refreshUser } = useUserInfo();
  const [isDataRefreshing, setIsDataRefreshing] = useState(false);

  const { t } = useTranslation();

  const [syncCommonAppDataMutation] = useMutation(SYNC_COMMON_APP_DATA_MUTATION);

  const {
    startPolling: startCommonAppSyncPolling,
    data: commonAppSyncData,
    stopPolling: stopCommonAppSyncPolling,
    loading: isSyncCommonAppDataLoading,
  } = useQuery(COMMON_APP_SYNC_STATUS, { fetchPolicy: 'network-only' });

  const client = useApolloClient();

  const commonAppSyncStatus = commonAppSyncData?.userInfo.commonAppData.syncStatus?.status;

  const lastSyncedAt = commonAppSyncData?.userInfo.commonAppData.syncStatus?.lastSyncedAt;

  const syncCommonAppData = async () => {
    setIsDataRefreshing(true);

    await syncCommonAppDataMutation();

    startCommonAppSyncPolling(1000);
  };

  const handleStatusChange = async (status: SYNC_STATUS) => {
    if (isDataRefreshing && status !== SYNC_STATUS.IN_PROGRESS) {
      stopCommonAppSyncPolling();

      if (status === SYNC_STATUS.COMPLETED) {
        refreshUser();
        await client.refetchQueries({
          include: queriesToRefetch,
        });
      }

      if (status === SYNC_STATUS.FAILED) {
        callToast('error', t('shared.commonAppDataSync.refreshError'));
      }

      setIsDataRefreshing(false);
    }
  };

  useUpdateEffect(() => {
    commonAppSyncStatus && handleStatusChange(commonAppSyncStatus);
  }, [commonAppSyncStatus, isDataRefreshing]);

  useEffect(
    () => () => {
      stopCommonAppSyncPolling();
    },
    []
  );

  return { isDataRefreshing, syncCommonAppData, lastSyncedAt, isSyncCommonAppDataLoading };
}
