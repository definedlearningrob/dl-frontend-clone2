import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import unassignStudentFromCourseMutation from '@dc/graphql/user/mutations/unassignStudentFromCourse';
import { shapeStudent } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

UserStudentCurrentCoursesCardUnassignModal.propTypes = {
  courseId: PropTypes.string,
  courseName: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  student: shapeStudent,
};

function UserStudentCurrentCoursesCardUnassignModal({
  courseId,
  courseName,
  isOpen,
  onClose,
  student,
}) {
  const [unassignStudentFromCourse, { loading }] = useMutation(unassignStudentFromCourseMutation);
  const { id: studentUuid } = useParams();
  const { t } = useTranslation();
  const studentName = useMemo(() => `${student.firstName} ${student.lastName}`, [student]);

  const onUnassign = async () => {
    await unassignStudentFromCourse({
      variables: {
        input: {
          courseId,
          studentUuid,
        },
      },
      update(cache) {
        cache.modify({
          id: cache.identify(student),
          fields: {
            currentCourses(existing, { readField }) {
              return existing.filter((course) => readField('id', course) !== courseId);
            },
          },
        });
      },
    });

    callToast(
      'success',
      t('user.student.currentCourses.unassignModal.notification', { courseName, studentName })
    );
    onClose();
  };

  return (
    isOpen && (
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>
            {t('user.student.currentCourses.unassignModal.heading')}
          </SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <p className='course-unenroll-modal__description'>
            {t('user.student.currentCourses.unassignModal.description', {
              courseName,
              studentName,
            })}
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
            onClick={onUnassign}>
            {t('user.student.currentCourses.unassignModal.buttonText')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    )
  );
}

export default UserStudentCurrentCoursesCardUnassignModal;
