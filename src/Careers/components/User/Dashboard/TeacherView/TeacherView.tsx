import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useAcademyCoursesQuery } from '@graphql/shared/users/hooks';
import { isEmpty } from 'lodash-es';

import ActivityLog from '@dc/components/User/Dashboard/TeacherView/ActivityLog/ActivityLog';
import adminUsernameQuery from '@dc/graphql/user/queries/adminUsername';
import { TeacherViewClasses } from '@dc/components/User/Dashboard/TeacherView/Classes/TeacherViewClasses';
import { MyReports } from '@dc/components/User/Dashboard/TeacherView/MyReports/MyReports';
import TopCareerClustersEnrolled from '@dc/components/User/Dashboard/TeacherView/TopCareerClustersEnrolled/TopCareerClustersEnrolled';
import TopPathwaysEnrolled from '@dc/components/User/Dashboard/TeacherView/TopPathwaysEnrolled/TopPathwaysEnrolled';
import { GenerateReportsSection } from '@dc/components/User/Dashboard/GenerateReportsSection';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ReportsProvider } from '@dc/hooks/useReports';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { WelcomeMessage } from '@shared/components/WelcomeMessage';
import { schoolYearsOptions } from '@shared/utils/schoolYear';
import './TeacherView.sass';
import './Skeleton/Skeleton.sass';
import { useResizeWidthObserver } from '@shared/hooks/useResizeWidthObserver';
import { AcademyCourses } from '@shared/components/WelcomeMessage/AcademyCourses';

const GAP_OFFSET = 8;

const UserDashboardTeacherView = () => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const [reportModalOpened, setReportModalOpened] = useState(false);

  const { data, loading } = useAcademyCoursesQuery({
    skip: isEmpty(import.meta.env.VITE_ACADEMY_URL),
  });
  const { userInfo } = useUserInfo<TUserInfo>();
  const contentWrapperRef = useRef(null);
  const headingRef = useRef(null);

  const [entity] = userInfo.entities.nodes;

  const titleWidth = useResizeWidthObserver(headingRef);
  const welcomeMessageWidth = useResizeWidthObserver(contentWrapperRef);

  const toggleReportModal = () => setReportModalOpened(!reportModalOpened);

  const isManagementEnabled = entity.settings.classManagementEnabled;

  const userHeading = uuid && (
    <SharedDataLoader options={{ variables: { uuid } }} query={adminUsernameQuery}>
      {/* @ts-ignore */}
      {({ user: { firstName, lastName } }) => (
        <h1 className='teacher-dashboard__user-heading'>
          {t('user.dashboard.userHeading', { firstName, lastName })}
        </h1>
      )}
    </SharedDataLoader>
  );

  return (
    <>
      {userHeading}
      <div className='flex items-center pb-base gap-xs'>
        <h1 ref={headingRef} className='text-base color-neutral-800 mb-0'>
          {t('user.dashboard.heading')}
        </h1>
        {userInfo.welcomeMessage && (
          <WelcomeMessage
            additionalContent={
              <AcademyCourses academyCourses={data?.academyCourses} loading={loading} />
            }
            leftOffset={-titleWidth - GAP_OFFSET}
            welcomeMessage={userInfo.welcomeMessage}
            width={welcomeMessageWidth}
          />
        )}
      </div>
      <div ref={contentWrapperRef} className='teacher-dashboard' data-testid='teacher-view'>
        <div className='teacher-dashboard__top'>
          <TeacherViewClasses isManagementEnabled={isManagementEnabled} />
          <ActivityLog />
        </div>
        <ReportsProvider>
          <div className='teacher-dashboard__bottom'>
            <GenerateReportsSection
              schoolYearStartDate={entity.settings.schoolYearStartDate}
              schoolYearsOptions={schoolYearsOptions}
              toggleReportModal={toggleReportModal}
            />
            <MyReports
              reportModalOpened={reportModalOpened}
              toggleReportModal={toggleReportModal}
            />
            <TopPathwaysEnrolled />
            <TopCareerClustersEnrolled />
          </div>
        </ReportsProvider>
      </div>
    </>
  );
};

export default UserDashboardTeacherView;
