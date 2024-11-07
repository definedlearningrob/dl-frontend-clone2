import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import Content from '@dc/components/User/Dashboard/shared/TopCareerClustersEnrolledContent/TopCareerClustersEnrolledContent';
import TeacherViewTopClustersSkeleton from '@dc/components/Dashboard/Skeleton/Content/TopClusters/Clusters';
import { useTeacherClusterEnrollmentStats } from '@dc/graphql/user/hooks/useTeacherClusterEnrollmentStatsQuery';
import { useReports } from '@dc/hooks/useReports';

const UserDashboardTeacherViewTopCareerClustersEnrolled = () => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { reportStartYear } = useReports();
  const { data, loading } = useTeacherClusterEnrollmentStats({
    userUuid: uuid,
    startYear: reportStartYear,
  });

  if (loading) {
    return <TeacherViewTopClustersSkeleton />;
  }

  if (!data) {
    return null;
  }

  const { clusterEnrollmentStats } = data.teacherDashboard;

  return (
    <Card className='teacher-dashboard__top-career-clusters-enrolled'>
      <h4 className='teacher-dashboard__top-career-clusters-enrolled__heading'>
        {t('user.dashboard.topCareerClustersEnrolled.heading')}
      </h4>
      <Content clusterEnrollmentStats={clusterEnrollmentStats} />
    </Card>
  );
};

export default UserDashboardTeacherViewTopCareerClustersEnrolled;
