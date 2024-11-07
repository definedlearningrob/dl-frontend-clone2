import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useCurrentCoursesQuery } from '@graphql/dc/students/hooks';
import { useTranslation } from 'react-i18next';

import AllList from '@dc/components/Student/Courses/AllList/AllList';
import { CourseFilters } from '@dc/components/Courses/CourseFilters';
import CourseModal from '@dc/components/Onboarding/Result/CourseModal/CourseModal';
import { CurrentList } from '@dc/components/Student/Courses/CurrentList/CurrentList.tsx';
import useUserInfo from '@dc/hooks/useUserInfo';

import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import Card from '@shared/components/Card/Card';
import { MainContent } from '@shared/components/MainContent/MainContent';

const StudentAppCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const {
    userInfo: { hasCompletedAssessment },
  } = useUserInfo();

  const { t } = useTranslation();
  const client = useApolloClient();

  const { data, loading } = useCurrentCoursesQuery();

  const closeCourseModal = () => setSelectedCourse(null);

  // This is a little hack to force destroy and mount component with cleared cache.
  // This is for infinite scroll to works properly
  const onFilterChange = () => {
    client.cache.modify({
      fields: {
        allCourses() {
          return undefined;
        },
      },
    });
  };

  return (
    <MainContent className='!pt-xs xxxl:!pt-sm min-h-[theme(layout.containerHeight)] flex flex-col'>
      <div className='mb-base xxxl:mb-md'>
        <Card>
          <CurrentList
            currentCourses={data?.currentCourses}
            loading={loading}
            teacherView={false}
          />
        </Card>
      </div>
      <Card className='grow'>
        <div className='mb-base border-b border-neutral-300'>
          <h2 className='text-sm xxxl:text-base mb-xxs xxxl:mb-xs'>
            {t('student.courses.heading')}
          </h2>
          <div className='text-xs xxxl:text-sm mb-sm text-font-secondary'>
            {t('student.courses.description')}
          </div>
        </div>
        <FilterProvider
          initialFilters={{ pathwayIdIn: [], collectionIdIn: [], searchableColumnsCont: '' }}
          onFilterChange={onFilterChange}>
          <>
            <div className='mb-sm xxxl:mb-base'>
              <CourseFilters />
            </div>
            <AllList
              hasCompletedAssessment={hasCompletedAssessment}
              loading={loading}
              selectCourse={setSelectedCourse}
            />
          </>
        </FilterProvider>
      </Card>
      {!!selectedCourse && <CourseModal closeModal={closeCourseModal} course={selectedCourse} />}
    </MainContent>
  );
};

export default StudentAppCourses;
