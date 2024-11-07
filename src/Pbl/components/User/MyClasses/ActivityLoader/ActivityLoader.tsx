import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { useTeacherDashboard } from '@pbl/graphql/user/hooks/useTeacherDashboard';

import ActivityLog from '@shared/components/ActivityLog/ActivityLog';
import { getParsedActivityItems } from '@shared/utils/parseActivityLog';
import Card from '@shared/components/Card/Card';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const UserMyClassesActivityLoader = () => {
  const { userUuid } = useParams<{ userUuid: string }>();
  const { data, loading, fetchMore } = useTeacherDashboard({ userUuid });

  const history = useHistory();
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card className='h-full flex flex-col'>
        <Card.Title className='!text-base xxxl:!text-base'>
          {t('user.myClasses.activityHeader')}
        </Card.Title>
        <Card.Body className='flex flex-col justify-center grow'>
          <SharedLoadingSpinner size='small' />
        </Card.Body>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const {
    teacherDashboard: { activityLog },
  } = data;

  const parsedData = getParsedActivityItems(activityLog.edges, history);

  const activityClasses = cx('h-full pb-xs', {
    'flex items-center justify-center': isEmpty(activityLog.edges),
  });

  return (
    <ActivityLog
      className='h-full flex flex-col'
      classNameList={activityClasses}
      data={parsedData}
      fetchMore={fetchMore}
      loading={loading}
      pageInfo={activityLog?.pageInfo}
      title={t('user.myClasses.activityHeader')}
    />
  );
};
