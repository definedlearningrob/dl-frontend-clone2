import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import disenrollFromCourseMutation from '@dc/graphql/student/mutations/disenrollFromCourse';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

StudentCourseHeaderUnenrollModal.propTypes = {
  courseName: PropTypes.string,
  onClose: PropTypes.func,
};

function StudentCourseHeaderUnenrollModal({ courseName, onClose }) {
  const [unenrollFromCourse, { loading }] = useMutation(disenrollFromCourseMutation);
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();

  const onUnenroll = async () => {
    await unenrollFromCourse({
      variables: { input: { courseId: id } },
      update(
        cache,
        {
          data: {
            disenrollFromCourse: { courseId },
          },
        }
      ) {
        cache.modify({
          fields: {
            currentCourses(existing, { readField }) {
              return existing.filter((course) => readField('id', course) !== courseId);
            },
          },
        });
      },
    });

    callToast('success', t('course.unenrollModal.notification', { courseName }));
    history.push('/courses');
  };

  return (
    <SharedModal onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('course.unenrollModal.heading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='course-unenroll-modal__description'>
          {t('course.unenrollModal.description', { courseName })}
        </p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          className='course-unenroll-modal__button'
          variant='primary-outlined'
          onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          className='course-unenroll-modal__button'
          isLoading={loading}
          variant='primary'
          onClick={onUnenroll}>
          {t('course.unenrollModal.unenrollButton')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default StudentCourseHeaderUnenrollModal;
