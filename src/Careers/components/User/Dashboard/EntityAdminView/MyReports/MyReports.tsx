import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import Content from '@dc/components/User/Dashboard/shared/MyReportsContent/MyReportsContent';
import DashboardMyReportsSkeleton from '@dc/components/Dashboard/Skeleton/Content/MyReports/MyReports';
import entityPlansQuery from '@dc/graphql/user/queries/entityPlans';
import { useReports } from '@dc/hooks/useReports';
import useUserInfo from '@dc/hooks/useUserInfo';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReportLevels } from '@dc/resources/enums';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { useAdminDashboardMyReports } from '@dc/graphql/user/hooks/useAdminDashboardMyReports';

type Props = {
  reportModalOpened: boolean;
  toggleReportModal: () => void;
};

const UserDashboardEntityAdminViewMyReports = ({ reportModalOpened, toggleReportModal }: Props) => {
  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const entityUuid = uuid || entities.nodes[0].uuid;
  const { data: plansData } = useQuery(entityPlansQuery, {
    variables: { uuid: entityUuid },
    skip: !reportModalOpened,
  });
  const { reportStartYear } = useReports();
  const { data, loading } = useAdminDashboardMyReports({
    uuid: entityUuid,
    startYear: reportStartYear,
  });
  const heading = uuid ? t('user.dashboard.entityReports') : t('user.dashboard.myReports.summary');

  if (loading) return <DashboardMyReportsSkeleton heading={heading} type='vertical' />;

  if (!data) {
    return null;
  }

  const { myReports } = data.adminDashboard.entity;

  return (
    <Card className='teacher-dashboard__my-reports entity-admin-dashboard__my-reports dashboard-scroll'>
      <h4 className='teacher-dashboard__my-reports__heading text-base mb-base'>{heading}</h4>
      <Content myReports={myReports} vertical={true} />
      {reportModalOpened && (
        <UserReportModal
          level={ReportLevels.ENTITY}
          levelUuid={entityUuid}
          plans={plansData?.entity.plans}
          onClose={toggleReportModal}
        />
      )}
    </Card>
  );
};

export default UserDashboardEntityAdminViewMyReports;
