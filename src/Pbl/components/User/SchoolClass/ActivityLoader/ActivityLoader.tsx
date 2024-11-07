import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useMemo } from 'react';

import SCHOOL_CLASS_ACTIVITY, {
  type TSchoolClassActivityData,
  type TSchoolClassActivityVariables,
} from '@pbl/graphql/user/queries/schoolClassActivity';

import ActivityLog, { type TActivityItem } from '@shared/components/ActivityLog/ActivityLog';
import { getParsedActivityItems } from '@shared/utils/parseActivityLog';

const INITIAL_ACTIVITIES = 15;

const UserSchoolClassActivityLoader = () => {
  const { classId } = useParams<{ classId: string }>();
  const { data, loading, fetchMore } = useQuery<
    TSchoolClassActivityData,
    TSchoolClassActivityVariables
  >(SCHOOL_CLASS_ACTIVITY, {
    variables: {
      first: INITIAL_ACTIVITIES,
      uuid: classId,
    },
  });
  const history = useHistory();
  const { t } = useTranslation();
  const title = t('user.schoolClass.activityHeader');

  const parsedData: TActivityItem[] | undefined = useMemo(
    () =>
      // ignored because missing `context` in query & missing `id` in `target`
      //@ts-ignore
      data && getParsedActivityItems(data.schoolClass.activityLog.edges, history),
    [data]
  );

  const shouldCenterContainer = Boolean(data && data?.schoolClass.activityLog.edges.length < 1);

  return (
    <ActivityLog
      className='flex flex-col h-full'
      classNameList={cx('h-full pb-xs', {
        'flex items-center justify-center': shouldCenterContainer,
      })}
      data={parsedData}
      fetchMore={fetchMore}
      loading={loading}
      pageInfo={data?.schoolClass.activityLog.pageInfo}
      title={title}
    />
  );
};

export default UserSchoolClassActivityLoader;
