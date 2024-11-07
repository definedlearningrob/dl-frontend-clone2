import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import Content from '@dc/components/User/Dashboard/shared/TopPathwaysEnrolledContent/TopPathwaysEnrolledContent';
import TeacherViewTopPathwaysSkeleton from '@dc/components/Dashboard/Skeleton/Content/TopPathways/Pathways';
import { useTeacherPathwayEnrollmentStats } from '@dc/graphql/user/hooks/useTeacherPathwayEnrollmentStats';
import { useReports } from '@dc/hooks/useReports';

const UserDashboardTeacherViewTopPathwaysEnrolled = () => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { reportStartYear } = useReports();

  const { data, loading } = useTeacherPathwayEnrollmentStats({
    userUuid: uuid,
    startYear: reportStartYear,
  });

  if (loading) {
    return <TeacherViewTopPathwaysSkeleton />;
  }

  if (!data) {
    return null;
  }

  const { pathwayEnrollmentStats } = data.teacherDashboard;

  return (
    <Card className='teacher-dashboard__top-pathways-enrolled'>
      <h4 className='teacher-dashboard__top-pathways-enrolled__heading'>
        {t('user.dashboard.topPathwaysEnrolled.heading')}
      </h4>
      <Content pathwayEnrollmentStats={pathwayEnrollmentStats} />
    </Card>
  );
};

export default UserDashboardTeacherViewTopPathwaysEnrolled;
