import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CoursesList } from '@dc/components/User/Courses/CoursesList/CoursesList';
import { CourseFilters } from '@dc/components/Courses/CourseFilters';
import CourseModal from '@dc/components/Onboarding/Result/CourseModal/CourseModal';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import Card from '@shared/components/Card/Card';
import { MainContent } from '@shared/components/MainContent/MainContent';

function UserAppCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { setBackNavButton } = useNavigation();

  const { t } = useTranslation();

  const closeCourseModal = () => setSelectedCourse(null);

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <MainContent className='!pt-xs xxxl:!pt-sm'>
      <Card className='flex flex-col min-h-[calc(theme(layout.containerHeight)-32px)] xxxl:min-h-[calc(theme(layout.containerHeight)-48px)]'>
        <div className='border-b border-neutral-300 mb-base'>
          <h1 className='text-base mb-xs'>{t('user.courses.heading')}</h1>
          <p className='text-sm text-font-secondary tracking-normal'>
            {t('user.courses.description')}
          </p>
        </div>
        <FilterProvider
          initialFilters={{
            collectionIdIn: [],
            pathwayIdIn: [],
            typeEq: null,
            searchableColumnsCont: '',
          }}>
          <section className='flex flex-col grow h-full'>
            <div className='mb-sm xxxl:mb-base'>
              <CourseFilters />
            </div>
            <CoursesList selectCourse={setSelectedCourse} />
          </section>
        </FilterProvider>
        {!!selectedCourse && (
          <CourseModal closeModal={closeCourseModal} course={selectedCourse} teacherView={true} />
        )}
      </Card>
    </MainContent>
  );
}

export default UserAppCourses;
