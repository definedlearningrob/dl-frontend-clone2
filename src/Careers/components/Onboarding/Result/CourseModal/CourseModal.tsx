import { PureQueryOptions, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import assesmentCourse, {
  type TCourseData,
  type TCourseVariables,
} from '@dc/graphql/student/queries/assesmentCourse';
import assignStudentToCourseMutation from '@dc/graphql/user/mutations/assignStudentToCourse';
import enrollInCourseMutation from '@dc/graphql/student/mutations/enrollInCourse';
import markOnboardingAsCompletedMutation from '@dc/graphql/student/queries/markOnboardingAsCompleted';
import useUserInfo from '@dc/hooks/useUserInfo';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { TCourse } from '@dc/graphql/student/queries/assessmentResults';
import { TStudent } from '@dc/graphql/user/queries/studentCurrentCourses';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import SharedButton from '@shared/components/Button/Button';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type Props = {
  closeModal: () => void;
  course: TCourse;
  refetchQueries?: PureQueryOptions[];
  student?: TStudent;
  teacherView?: boolean;
};

function OnboardingPathwayCourseModal({
  closeModal,
  course,
  refetchQueries = [],
  student,
  teacherView = false,
}: Props) {
  const { userInfo, refreshUser } = useUserInfo<TStudentInfo>();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const enrollMutation = teacherView ? assignStudentToCourseMutation : enrollInCourseMutation;
  const [mutateEnrollInCourse, { loading: enrollLoading }] = useMutation(enrollMutation);
  const [mutateFinishOnboarding, { loading: finishLoading }] = useMutation(
    markOnboardingAsCompletedMutation
  );
  const history = useHistory();
  const isFinishingOnboarding =
    userInfo.settings?.onboardingEnabled && !userInfo.hasCompletedOnboarding;

  const enrollInCourse = async () => {
    const variables = teacherView
      ? { input: { courseId: course.id, studentUuid: id } }
      : { input: { courseId: course.id } };

    await mutateEnrollInCourse({
      variables,
      refetchQueries,
      awaitRefetchQueries: true,
      update(cache, { data }) {
        cache.modify({
          fields: {
            currentCourses(existing) {
              const returnedCourse = data.enrollInCourse?.course;

              return returnedCourse ? [...existing, returnedCourse] : existing;
            },
            recommendedCourses(existing, { readField }) {
              const returnedCourse = data.enrollInCourse?.course;

              return returnedCourse
                ? // We don't know structure of the data in cache since it can be merged with different queries
                  existing.filter(
                    (filteredCourse: any) => readField('id', filteredCourse) !== returnedCourse.id
                  )
                : existing;
            },
          },
        });
        cache.modify({
          id: cache.identify(student || {}),
          fields: {
            currentCourses(existing) {
              const returnedCourse = data.assignStudentToCourse?.course;

              return returnedCourse ? [...existing, returnedCourse] : existing;
            },
            recommendedCourses(existing, { readField }) {
              const returnedCourse = data.assignStudentToCourse?.course;

              return returnedCourse
                ? // We don't know structure of the data in cache since it can be merged with different queries
                  existing.filter(
                    (filteredCourse: any) => readField('id', filteredCourse) !== returnedCourse.id
                  )
                : existing;
            },
          },
        });
      },
    });

    if (isFinishingOnboarding) {
      await mutateFinishOnboarding({ variables: { input: {} } });
      refreshUser();
    }

    const notification = teacherView
      ? t('user.student.courses.invitedSuccessfully')
      : t('student.onboarding.pathway.enrolledSuccessfully');

    callToast('success', notification);
    closeModal();
    if (!teacherView) {
      history.push(`/courses/${course.id}`);
    }
  };

  return (
    <SharedModal
      className='assessment-result-course-modal__scroll'
      isOpen={true}
      scrollable={true}
      onDismiss={closeModal}>
      <SharedModal.Header withoutPadding={true}>
        <div className='assessment-result-course-modal__image-container'>
          <SharedDataLoader<TCourseData, TCourseVariables>
            options={{
              variables: {
                id: course.id,
                track: false,
              },
            }}
            query={assesmentCourse}>
            {({ course: { imageUrl, thumbnailUrl } }) => (
              <SharedImage
                alt={course.name}
                className='assessment-result-course-modal__image'
                fallbackSrc={imageUrl}
                src={thumbnailUrl}
              />
            )}
          </SharedDataLoader>
        </div>
      </SharedModal.Header>
      <SharedModal.Body>
        <h3 className='assessment-result-course-modal__title'>{course.name}</h3>
        {course.description && (
          <InjectedContent
            className='assessment-result-course-modal__text'
            content={course.description}
          />
        )}
        <h4 className='assessment-result-course-modal__sub-title'>
          {t('student.onboarding.pathway.course.salaryTitle')}
        </h4>
        <span className='assessment-result-course-modal__text'>
          {t('student.onboarding.pathway.course.salary', {
            salary: course.metadata.averageSalary,
          })}
        </span>
        <h4 className='assessment-result-course-modal__sub-title'>
          {t('student.onboarding.pathway.course.next10yearsTitle')}
        </h4>
        <span className='assessment-result-course-modal__text'>{course.metadata.outlook}</span>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton
          className='assessment-result-course-modal__button'
          data-testid='close-modal'
          variant='primary-outlined'
          onClick={closeModal}>
          <>{t('common.actions.back')}</>
        </SharedButton>
        {course.status !== PUBLISHING_STATUSES.DRAFT && (
          <SharedButton
            className='assessment-result-course-modal__button'
            data-testid='enroll-in-course'
            isLoading={enrollLoading || finishLoading}
            variant='primary'
            onClick={enrollInCourse}>
            <>
              {teacherView
                ? t('user.student.courses.inviteToCourse')
                : t('student.onboarding.pathway.enroll')}
            </>
          </SharedButton>
        )}
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default OnboardingPathwayCourseModal;
