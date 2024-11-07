import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash-es';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import assessmentResultsQuery from '@dc/graphql/student/queries/assessmentResults';
import ComponentResultSection from '@dc/components/Onboarding/Result/ComponentResultSection/ComponentResultSection';
import CourseModal from '@dc/components/Onboarding/Result/CourseModal/CourseModal';
import Courses from '@dc/components/Onboarding/Result/Courses/Courses';
import { MiddleSchoolOverview } from '@dc/components/Onboarding/Result/MiddleSchoolOverview/MiddleSchoolOverview';
import IntroSection from '@dc/components/Onboarding/Result/IntroSection/IntroSection';
import Navbar from '@dc/components/Onboarding/Result/Navbar/Navbar';
import PathwayOptions from '@dc/components/Onboarding/Result/PathwayOptions/PathwayOptions';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import markOnboardingAsCompletedMutation from '@dc/graphql/student/queries/markOnboardingAsCompleted';
import useUserInfo from '@dc/hooks/useUserInfo';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { ContentStatusesTypes } from '@shared/resources/enums';
import Button from '@shared/components/Button/Button';
import { ReadSpeaker } from '@shared/components/ReadSpeaker/ReadSpeaker';

import '@dc/components/Onboarding/Result/Result.sass';

OnboardingResult.propTypes = {
  assessmentType: PropTypes.oneOf([
    CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
    CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
  ]),
};

function OnboardingResult({ assessmentType }) {
  const { refreshUser, userInfo } = useUserInfo();
  const history = useHistory();
  const { t } = useTranslation();
  const isMiddleSchool = assessmentType === CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL;
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const pathwaySectionRef = useRef(null);

  const [mutateFinishOnboarding, { loading: finishLoading }] = useMutation(
    markOnboardingAsCompletedMutation
  );

  useEffect(() => {
    const courseTable = document.querySelector('#course-table');
    if (courseTable) {
      courseTable.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedPathway]);

  const selectCourse = (course) => setSelectedCourse(course);
  const closeCourseModal = () => setSelectedCourse(null);

  const renderCourseEnrollmentSection = (selectedCourses) => {
    const coursesByType = groupBy(selectedPathway.courses, 'type');

    if (isMiddleSchool) {
      const middleSchoolCourses = coursesByType[CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL] ?? [];

      return (
        <MiddleSchoolOverview
          enrolledCourses={selectedCourses}
          middleSchoolCourses={middleSchoolCourses.filter(
            (course) => course.status === ContentStatusesTypes.PUBLISHED
          )}
          selectCourse={selectCourse}
          selectedPathway={selectedPathway}
        />
      );
    }

    const highSchoolCourses = coursesByType[CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL] ?? [];

    return (
      <Courses
        courses={highSchoolCourses}
        enrolledCourses={selectedCourses}
        selectCourse={selectCourse}
        selectedPathway={selectedPathway}
      />
    );
  };

  const handleSkip = async () => {
    await mutateFinishOnboarding({ variables: { input: {} } });
    await refreshUser();
    history.push('/courses/');
  };

  return (
    <SharedDataLoader query={assessmentResultsQuery}>
      {({ assessmentProgress: { result }, currentCourses: selectedCourses }) => (
        <div className='assessment-result' data-testid='assessment-result'>
          <Navbar bottom={false} />
          <IntroSection />
          <ComponentResultSection />
          <div ref={pathwaySectionRef} className='assessment-result__pathway-options-wrapper'>
            <PathwayOptions
              pathways={result}
              selectedPathway={selectedPathway}
              setSelectedPathway={setSelectedPathway}
            />
          </div>
          {selectedPathway && (
            <div className='assessment-result__courses'>
              {renderCourseEnrollmentSection(selectedCourses)}
            </div>
          )}
          {!userInfo.hasCompletedOnboarding && (
            <div className='flex justify-center pt-sm'>
              <Button disabled={finishLoading} variant='primary-outlined' onClick={handleSkip}>
                {t('student.onboarding.pathway.skipForNow')}
              </Button>
            </div>
          )}

          {!!selectedCourse && (
            <CourseModal
              closeModal={closeCourseModal}
              course={selectedCourse}
              refetchQueries={[{ query: assessmentAttemptStatusQuery }]}
            />
          )}
          <div className='fixed bottom-lg left-xs z-high [&_a>span]:!pl-xs'>
            <ReadSpeaker />
          </div>
          <Navbar bottom={true} />
        </div>
      )}
    </SharedDataLoader>
  );
}

export default OnboardingResult;
