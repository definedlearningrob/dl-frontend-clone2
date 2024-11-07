import { gql, TypedDocumentNode } from '@apollo/client';

import { TSyncStatus } from '@dc/resources/types';

export const COMMON_APP_SYNC_STATUS: TypedDocumentNode<TCommonAppSyncStatusData, undefined> = gql`
  query CommonAppSyncStatus {
    userInfo {
      uuid
      commonAppData {
        syncStatus {
          lastSyncedAt
          status
        }
      }
    }
  }
`;

type TCommonAppSyncStatusData = {
  userInfo: {
    uuid: string;
    commonAppData: {
      syncStatus: TSyncStatus;
    };
  };
};
