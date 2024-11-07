import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStudentCurrentCoursesQuery } from '@graphql/dc/users/hooks';
import { useTranslation } from 'react-i18next';

import AllList from '@dc/components/Student/Courses/AllList/AllList';
import { CourseFilters } from '@dc/components/Courses/CourseFilters';
import CourseModal from '@dc/components/Onboarding/Result/CourseModal/CourseModal';
import { CurrentList } from '@dc/components/Student/Courses/CurrentList/CurrentList';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import Card from '@shared/components/Card/Card';
import { MainContent } from '@shared/components/MainContent/MainContent';

const UserAppStudentCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();

  const closeCourseModal = () => setSelectedCourse(null);

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const { data, loading } = useStudentCurrentCoursesQuery({ variables: { uuid: id } });

  const hasCompletedAssessment = data?.student?.assessmentCompleted;

  return (
    <MainContent className='!pt-xs xxxl:!pt-sm min-h-[theme(layout.containerHeight)] flex flex-col'>
      <Card className='mb-base xxxl:mb-md'>
        <CurrentList
          currentCourses={data?.student?.currentCourses}
          loading={loading}
          teacherView={true}
        />
      </Card>
      <FilterProvider
        initialFilters={{
          pathwayIdIn: [],
          collectionIdIn: [],
          typeEq: null,
          searchableColumnsCont: '',
        }}>
        <Card className='grow flex flex-col'>
          <div className='mb-base border-b border-neutral-300'>
            <h2 className='text-sm xxxl:text-base mb-xxs xxxl:mb-xs'>
              {t('user.courses.heading')}
            </h2>
            <div className='text-xs xxxl:text-sm mb-sm'>{t('user.courses.description')}</div>
          </div>
          <div className='mb-sm xxxl:mb-base'>
            <CourseFilters />
          </div>
          <AllList
            hasCompletedAssessment={hasCompletedAssessment}
            selectCourse={setSelectedCourse}
            teacherView={true}
          />
        </Card>
      </FilterProvider>
      {!!selectedCourse && (
        <CourseModal
          closeModal={closeCourseModal}
          course={selectedCourse}
          student={data?.student}
          teacherView={true}
        />
      )}
    </MainContent>
  );
};

export default UserAppStudentCourses;
