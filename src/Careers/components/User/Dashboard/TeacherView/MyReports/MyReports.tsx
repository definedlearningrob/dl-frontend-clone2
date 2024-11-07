import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import Content from '@dc/components/User/Dashboard/shared/MyReportsContent/MyReportsContent';
import teacherDashboardPlansQuery from '@dc/graphql/user/queries/teacherDashboardPlans';
import TeacherViewMyReportsSkeleton from '@dc/components/Dashboard/Skeleton/Content/MyReports/MyReports';
import useUserInfo from '@dc/hooks/useUserInfo';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReportLevels } from '@dc/resources/enums';
import { useTeacherDashboardMyReportsQuery } from '@dc/graphql/user/hooks/useTeacherDashboardMyReportsQuery';
import { useReports } from '@dc/hooks/useReports';

type Props = {
  reportModalOpened: boolean;
  toggleReportModal: () => void;
};

export const MyReports = ({ reportModalOpened, toggleReportModal }: Props) => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { userInfo } = useUserInfo();
  const { reportStartYear } = useReports();
  const { data: plansData } = useQuery(teacherDashboardPlansQuery, {
    variables: { userUuid: uuid || userInfo.uuid },
    skip: !reportModalOpened,
  });
  const { data, loading } = useTeacherDashboardMyReportsQuery({
    userUuid: uuid || userInfo.uuid,
    startYear: reportStartYear,
  });

  if (loading) {
    return (
      <>
        <TeacherViewMyReportsSkeleton
          heading={t('user.dashboard.myReports.summary')}
          type='vertical'
        />
      </>
    );
  }

  if (!data) {
    return null;
  }

  const { myReports } = data.teacherDashboard;

  return (
    <>
      <Card className='teacher-dashboard__my-reports'>
        <h4 className='mb-base text-base'>{t('user.dashboard.myReports.summary')}</h4>
        <Content myReports={myReports} vertical={true} />
        {reportModalOpened && (
          <UserReportModal
            level={ReportLevels.USER}
            levelUuid={uuid || userInfo.uuid}
            plans={plansData?.teacherDashboard.plans}
            self={true}
            onClose={toggleReportModal}
          />
        )}
      </Card>
    </>
  );
};
