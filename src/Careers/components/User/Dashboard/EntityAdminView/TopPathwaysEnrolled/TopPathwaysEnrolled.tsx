import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import Content from '@dc/components/User/Dashboard/shared/TopPathwaysEnrolledContent/TopPathwaysEnrolledContent';
import useUserInfo from '@dc/hooks/useUserInfo';
import TeacherViewTopPathwaysSkeleton from '@dc/components/Dashboard/Skeleton/Content/TopPathways/Pathways';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { useAdminPathwayEnrollmentStats } from '@dc/graphql/user/hooks/useAdminPathwayEnrollmentStats';
import { useReports } from '@dc/hooks/useReports';

const UserDashboardEntityAdminViewTopPathwaysEnrolled = () => {
  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const entityUuid = uuid || entities.nodes[0].uuid;
  const { reportStartYear } = useReports();
  const { data, loading } = useAdminPathwayEnrollmentStats({
    uuid: entityUuid,
    startYear: reportStartYear,
  });

  if (loading) {
    return <TeacherViewTopPathwaysSkeleton />;
  }

  if (!data) {
    return null;
  }

  const { pathwayEnrollmentStats } = data.adminDashboard.entity;

  return (
    <Card className='teacher-dashboard__top-pathways-enrolled entity-admin-dashboard__top-pathways-enrolled'>
      <h4 className='teacher-dashboard__top-pathways-enrolled__heading'>
        {t('user.dashboard.topPathwaysEnrolled.heading')}
      </h4>
      <Content pathwayEnrollmentStats={pathwayEnrollmentStats} />
    </Card>
  );
};

export default UserDashboardEntityAdminViewTopPathwaysEnrolled;
