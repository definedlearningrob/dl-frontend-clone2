import { gql, TypedDocumentNode } from '@apollo/client';

import { TSyncStatus } from '@dc/resources/types';

export const SYNC_COMMON_APP_DATA_MUTATION: TypedDocumentNode<TSyncCommonAppData, null> = gql`
  mutation SyncCommonAppDataMutation {
    syncCommonAppData(input: {}) {
      status {
        status
        lastSyncedAt
      }
    }
  }
`;

export type TSyncCommonAppData = {
  syncCommonAppData: {
    status: TSyncStatus;
  };
};
