import { isEmpty } from 'lodash-es';
import { useApolloClient, useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { Extensions } from '@dc/components/EntityInfoExtensions';
import { GenerateReportsSection } from '@dc/components/User/Dashboard/GenerateReportsSection';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { useEntityAdminInfo } from '@dc/hooks/useEntityAdminInfo';
import MyReports from '@dc/components/User/Dashboard/EntityAdminView/MyReports/MyReports';
import Tables from '@dc/components/User/Dashboard/EntityAdminView/Tables/Tables';
import TopCareerClustersEnrolled from '@dc/components/User/Dashboard/EntityAdminView/TopCareerClustersEnrolled/TopCareerClustersEnrolled';
import TopPathwaysEnrolled from '@dc/components/User/Dashboard/EntityAdminView/TopPathwaysEnrolled/TopPathwaysEnrolled';
import UPDATE_ENTITY_SETTINGS from '@dc/graphql/user/mutations/updateEntitySettings';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ReportsProvider } from '@dc/hooks/useReports';

import { EntityAdminInfoSkeleton } from '@shared/components/EntityInfo/Skeleton/Skeleton';
import { EntityInfo } from '@shared/components/EntityInfo';
import { EntityProvider } from '@shared/hooks/useEntity';
import { schoolYearsOptions } from '@shared/utils/schoolYear';

import './Skeleton/Skeleton.sass';
import styles from './EntityAdminView.module.sass';

const UserDashboardEntityAdminView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [reportModalOpened, setReportModalOpened] = useState(false);
  const { cache } = useApolloClient();
  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();
  const entityUuid = uuid || entities.nodes[0].uuid;
  const { data, loading } = useEntityAdminInfo({ uuid: entityUuid });
  const [updateSettings] = useMutation(UPDATE_ENTITY_SETTINGS);

  useEffect(
    () => () => {
      cache.evict({
        id: cache.identify({
          __typename: 'EntityData',
          uuid: entityUuid,
        }),
        fieldName: 'settings',
      });
    },
    [entityUuid]
  );

  if (loading || isEmpty(data) || isEmpty(data.adminDashboard)) {
    return (
      <div className={styles.entityAdminDashboard} data-testid='entity-admin-view'>
        <EntityAdminInfoSkeleton />
      </div>
    );
  }

  const toggleReportModal = () => setReportModalOpened(!reportModalOpened);

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
              settings() {
                return data.updateEntitySettings.entity.settings;
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
    <div className={styles.entityAdminDashboard} data-testid='entity-admin-view'>
      <EntityProvider entity={data.adminDashboard.entity} saveEntitySetting={saveEntitySetting}>
        <EntityInfo additionalContent={<Extensions />} />
      </EntityProvider>
      <Tables key={entityUuid} hasChildren={data.adminDashboard.entity.hasChildren} />
      <ReportsProvider>
        <div className={styles.reportsContainer}>
          <GenerateReportsSection
            schoolYearStartDate={data.adminDashboard.entity.settings.schoolYearStartDate}
            schoolYearsOptions={schoolYearsOptions}
            toggleReportModal={toggleReportModal}
          />
          <MyReports reportModalOpened={reportModalOpened} toggleReportModal={toggleReportModal} />
          <TopPathwaysEnrolled />
          <TopCareerClustersEnrolled />
        </div>
      </ReportsProvider>
    </div>
  );
};

export default UserDashboardEntityAdminView;
