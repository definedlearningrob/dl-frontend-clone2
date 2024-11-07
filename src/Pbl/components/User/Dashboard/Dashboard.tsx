import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAcademyCoursesQuery } from '@graphql/shared/users/hooks';
import { isEmpty } from 'lodash-es';

import { TCatalog, TCatalogCourses } from '@pbl/graphql/user/queries/dashboardCatalog';
import Catalogs from '@pbl/components/User/Dashboard/Catalogs/Catalogs';
import { UserDashboardCourses } from '@pbl/components/User/Dashboard/Courses/Courses';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { WelcomeMessage } from '@shared/components/WelcomeMessage';
import { useResizeWidthObserver } from '@shared/hooks/useResizeWidthObserver';
import { AcademyCourses } from '@shared/components/WelcomeMessage/AcademyCourses';

const GAP_OFFSET = 8;

const UserDashboard = () => {
  const { userInfo } = useUserInfo();
  const { data, loading } = useAcademyCoursesQuery({
    skip: isEmpty(import.meta.env.VITE_ACADEMY_URL),
  });

  const [selectedCatalogData, setSelectedCatalogData] = useState<TCatalog>({
    courses: {} as TCatalogCourses,
    description: '',
    displayName: '',
    id: '',
    name: '',
    tasksCount: 0,
    thumbnailUrl: '',
    imageUrl: '',
    tracksCount: 0,
  });
  const contentWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const titleWidth = useResizeWidthObserver(headingRef);
  const welcomeMessageWidth = useResizeWidthObserver(contentWrapperRef);
  const { t } = useTranslation();

  return (
    <section>
      <div className='flex items-center pb-sm gap-xs'>
        <h1 ref={headingRef} className='text-base color-neutral-800 !mb-0'>
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
      <div ref={contentWrapperRef} className='flex flex-col gap-base xxxl:gap-md'>
        <Catalogs
          selectedCatalogData={selectedCatalogData}
          setSelectedCatalogData={setSelectedCatalogData}
        />
        <UserDashboardCourses
          key={selectedCatalogData.id}
          selectedCatalogData={selectedCatalogData}
        />
      </div>
    </section>
  );
};

export default UserDashboard;
