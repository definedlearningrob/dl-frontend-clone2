import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import useUserInfo from '@pbl/hooks/useUserInfo';
import UPDATE_ENTITY_SETTINGS, {
  TUpdateEntitySettingsMutationData,
  TUpdateEntitySettingsMutationVariables,
} from '@pbl/graphql/user/mutations/updateEntitySettings';
import { useEntityAdminInfo } from '@pbl/graphql/user/hooks/useEntityAdminInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { EntityAdminViewTables } from '@pbl/components/User/EntityDashboard/Tables/EntityAdminViewTables';

import { EntityProvider } from '@shared/hooks/useEntity';
import { EntityInfo } from '@shared/components/EntityInfo';
import LoaderSuspense from '@shared/components/LoaderSuspense/LoaderSuspense';

import styles from './EntityDashboard.module.sass';

export const EntityDashboard = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();

  const entityUuid = uuid || entities.nodes[0].uuid;

  const { data, loading } = useEntityAdminInfo({ uuid: entityUuid });

  const [updateSettings] = useMutation<
    TUpdateEntitySettingsMutationData,
    TUpdateEntitySettingsMutationVariables
  >(UPDATE_ENTITY_SETTINGS);

  if (loading || isEmpty(data) || isEmpty(data.adminDashboard)) {
    return <LoaderSuspense loading={loading} />;
  }

  // @ts-ignore
  const saveEntitySetting = async (settingsPayload) => {
    const entityDataCacheId = {
      uuid: entityUuid,
      __typename: 'EntityData',
    };

    try {
      await updateSettings({
        variables: {
          input: {
            uuid: entityUuid,
            settings: settingsPayload,
          },
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify(entityDataCacheId),
            fields: {
              settings(cachedSettings) {
                return { ...cachedSettings, ...data!.updateEntitySettings.entity.settings };
              },
            },
          });
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  };

  return (
    <div className={styles.adminDashboard} data-testid='entity-admin-view'>
      <EntityProvider entity={data.adminDashboard.entity} saveEntitySetting={saveEntitySetting}>
        <EntityInfo />
      </EntityProvider>
      <EntityAdminViewTables
        key={entityUuid}
        hasChildren={data.adminDashboard.entity.hasChildren}
      />
    </div>
  );
};
