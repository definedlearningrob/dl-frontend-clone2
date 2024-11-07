import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import MY_PROJECTS_ACTIVITY, {
  TMyProjectsActivityData,
  TMyProjectsActivityVariables,
} from '@pbl/graphql/user/queries/myProjectsActivityLog';

import ActivityLog, { TActivityItem } from '@shared/components/ActivityLog/ActivityLog';
import { getParsedActivityItems } from '@shared/utils/parseActivityLog';

import styles from './ActivityLoader.module.sass';

const INITIAL_ACTVITIES = 15;

const UserMyProjectsActivityLoader = () => {
  const { data, loading, fetchMore } = useQuery<
    TMyProjectsActivityData,
    TMyProjectsActivityVariables
  >(MY_PROJECTS_ACTIVITY, {
    variables: {
      first: INITIAL_ACTVITIES,
    },
  });
  const { t } = useTranslation();
  const title = t('user.myProjects.activityHeader');
  const history = useHistory();

  //@ts-ignore
  const parsedData: TActivityItem[] | undefined = useMemo(
    () =>
      //@ts-ignore
      data && getParsedActivityItems(data.myProjectsActivityLog.edges, history),
    [data]
  );

  const shouldCenterContainer = Boolean(data && data?.myProjectsActivityLog.edges.length < 1);

  const listClasses = cx(styles.scrollContainer, shouldCenterContainer && styles.centerScroll);

  return (
    <ActivityLog
      className={styles.container}
      classNameList={listClasses}
      data={parsedData}
      fetchMore={fetchMore}
      loading={loading}
      pageInfo={data?.myProjectsActivityLog.pageInfo}
      title={title}
    />
  );
};

export default UserMyProjectsActivityLoader;
