import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import assignSchoolClassToCourseMutation from '@dc/graphql/user/mutations/assignSchoolClassToCourse';
import ClassesSelect from '@dc/components/User/Course/AssignModal/ClassesSelect/ClassesSelect';
import unassignSchoolClassFromCourseMutation from '@dc/graphql/user/mutations/unassignSchoolClassFromCourse';
import { ACTION_TYPE } from '@dc/components/User/Course/Header/Header';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

UserCourseAssignModal.propTypes = {
  actionType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

function UserCourseAssignModal({ closeModal, actionType }) {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const isAssignAction = actionType === ACTION_TYPE.ASSIGN;
  const [schoolClass, setSchoolClass] = useState(null);
  const [mutateAssignSchoolClassToCourse, { loading: assignLoading }] = useMutation(
    assignSchoolClassToCourseMutation
  );
  const [mutateUnassignSchoolClassFromCourse, { loading: unassignLoading }] = useMutation(
    unassignSchoolClassFromCourseMutation
  );

  const assignShoolClassToCourse = async () => {
    await mutateAssignSchoolClassToCourse({
      variables: {
        input: {
          courseId,
          schoolClassUuid: schoolClass.uuid,
        },
      },
    });

    callToast('success', t('course.assignModal.assignSuccess'));
    closeModal();
  };

  const removeShoolClassFromCourse = async () => {
    await mutateUnassignSchoolClassFromCourse({
      variables: {
        input: {
          courseId,
          schoolClassUuid: schoolClass.uuid,
        },
      },
    });

    callToast('success', t('course.assignModal.unassignSuccess'));
    closeModal();
  };

  const handleAction = () =>
    isAssignAction ? assignShoolClassToCourse() : removeShoolClassFromCourse();

  return (
    <SharedModal isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t(`course.assignModal.${isAssignAction ? 'titleAssign' : 'titleUnassign'}`)}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='schoolclass-assing-modal'>
          <ClassesSelect
            disabled={assignLoading || unassignLoading}
            schoolClass={schoolClass}
            setSchoolClass={setSchoolClass}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='assign-modal-button'
          disabled={!schoolClass}
          isLoading={assignLoading || unassignLoading}
          variant='primary'
          onClick={handleAction}>
          {t(`course.assignModal.${isAssignAction ? 'buttonAssign' : 'buttonUnassign'}`)}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default UserCourseAssignModal;
