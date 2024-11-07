import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
// eslint-disable-next-line max-len
import Content from '@dc/components/User/Dashboard/shared/TopCareerClustersEnrolledContent/TopCareerClustersEnrolledContent';
import useUserInfo from '@dc/hooks/useUserInfo';
import DashboardTopClustersSkeleton from '@dc/components/Dashboard/Skeleton/Content/TopClusters/Clusters';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { useAdminClusterEnrollmentStats } from '@dc/graphql/user/hooks/useAdminClusterEnrollmentStats';
import { useReports } from '@dc/hooks/useReports';

const UserDashboardEntityAdminViewTopCareerClustersEnrolled = () => {
  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();
  const { t } = useTranslation();
  const { reportStartYear } = useReports();
  const { uuid } = useParams<{ uuid: string }>();
  const entityUuid = uuid || entities.nodes[0].uuid;
  const { data, loading } = useAdminClusterEnrollmentStats({
    uuid: entityUuid,
    startYear: reportStartYear,
  });

  if (!data || loading) return <DashboardTopClustersSkeleton />;

  const { clusterEnrollmentStats } = data.adminDashboard.entity;

  return (
    // eslint-disable-next-line max-len
    <Card className='teacher-dashboard__top-career-clusters-enrolled entity-admin-dashboard__top-career-clusters-enrolled'>
      <h4 className='teacher-dashboard__top-career-clusters-enrolled__heading'>
        {t('user.dashboard.topCareerClustersEnrolled.heading')}
      </h4>
      <Content clusterEnrollmentStats={clusterEnrollmentStats} />
    </Card>
  );
};

export default UserDashboardEntityAdminViewTopCareerClustersEnrolled;
