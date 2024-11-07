import cx from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

import { useTeacherDashboard } from '@pbl/graphql/user/hooks/useTeacherDashboard';

import { getParsedActivityItems } from '@shared/utils/parseActivityLog';
import ActivityLog from '@shared/components/ActivityLog/ActivityLog';

import styles from './ClassActivity.module.sass';

export const ClassActivity = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { userUuid } = useParams<{ userUuid: string }>();
  const { data, loading, fetchMore } = useTeacherDashboard({ userUuid });

  if (!data) {
    return null;
  }

  const {
    teacherDashboard: { activityLog },
  } = data;
  const title = t('user.myClasses.activityHeader');

  const parsedData = useMemo(
    () => activityLog && getParsedActivityItems(activityLog.edges, history),
    [activityLog]
  );

  const activityClass = cx(styles.scrollContainer, {
    [styles.centerScroll]: isEmpty(activityLog.edges),
  });

  return (
    <ActivityLog
      className={styles.container}
      classNameList={activityClass}
      data={parsedData}
      fetchMore={fetchMore}
      loading={loading}
      pageInfo={activityLog.pageInfo}
      title={title}
    />
  );
};
