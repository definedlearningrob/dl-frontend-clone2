import cx from 'classnames';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TEACHER_ACTIVITY_LOG, {
  type TTeacherActivityData,
  type TTeacherActivityVariables,
} from '@dc/graphql/user/queries/teacherDashboardActivityLog';

import ActivityLog, { TActivityItem } from '@shared/components/ActivityLog/ActivityLog';
import { getParsedActivityItems } from '@shared/utils/parseActivityLog';

import TeacherViewActivityLogSkeleton from '../Skeleton/ActivityLog/ActivityLog';

import styles from './ActivityLog.module.sass';

const INITIAL_ACTVITIES = 15;

function UserDashboardTeacherViewActivityLog() {
  const { uuid } = useParams<{ uuid: string }>();
  const { data, loading, fetchMore } = useQuery<TTeacherActivityData, TTeacherActivityVariables>(
    TEACHER_ACTIVITY_LOG,
    {
      variables: {
        userUuid: uuid,
        first: INITIAL_ACTVITIES,
      },
    }
  );
  const { t } = useTranslation();
  const history = useHistory();

  const parsedData: TActivityItem[] | undefined = useMemo(
    () => data && getParsedActivityItems(data.teacherDashboard.activityLog.edges, history),
    [data]
  );

  const shouldCenterContainer = Boolean(
    data && data?.teacherDashboard.activityLog.edges.length < 1
  );

  return (
    <ActivityLog
      className={styles.wrapper}
      classNameList={cx(styles.list, shouldCenterContainer && styles.centered)}
      data={parsedData}
      fetchMore={fetchMore}
      loader={<TeacherViewActivityLogSkeleton />}
      loading={loading}
      pageInfo={data?.teacherDashboard.activityLog.pageInfo}
      title={t('user.dashboard.activityLog.title')}
    />
  );
}

export default UserDashboardTeacherViewActivityLog;
