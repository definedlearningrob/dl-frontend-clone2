import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { compact } from 'lodash-es';

import { RecommendersForm } from '@dc/components/Student/ApplicationsManagement/RecommendersForm';
import { useAvailableTeachersQuery } from '@dc/graphql/student/hooks/useAvailableTeachersQuery';
import { useInstitutionQuery } from '@dc/graphql/student/hooks/useInstitutionQuery';
import { AvailableTeacher } from '@dc/components/Student/ApplicationsManagement/types';
import { useSelectTeachers } from '@dc/graphql/student/hooks/useSelectTeachers';
import { RECOMMENDER_TYPE } from '@dc/resources/enums';
import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplications';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';
import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

type FormValues = {
  recommenders: { label: string; value?: string }[];
};

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  selectedApplication: InstitutionApplication;
};

export const RecommendersModal = ({ closeModal, isOpen, selectedApplication }: Props) => {
  const { t } = useTranslation();
  const { data: availableTeachersData, loading: isTeachersLoading } = useAvailableTeachersQuery({
    skip: !isOpen,
  });
  const { data: institutionData, loading: isInstitutionLoading } = useInstitutionQuery({
    id: selectedApplication.institution.id,
  });
  const [selectTeachers] = useSelectTeachers();
  const recommenders = selectedApplication.recommenders?.filter(
    (recommender) => recommender.type === RECOMMENDER_TYPE.TEACHER
  );

  const isContentLoading = isTeachersLoading || isInstitutionLoading;

  if (isContentLoading) {
    return (
      <SharedModal isOpen={isOpen} onDismiss={closeModal}>
        <SharedModal.Header>
          <SharedModal.Heading>
            {t('student.postSecondary.recommendersSection.recommendersHeading')}
          </SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body className='flex flex-col justify-center h-full'>
          <LoadingSpinner color='primary' size='medium' />
        </SharedModal.Body>
      </SharedModal>
    );
  }

  if (!availableTeachersData || !institutionData) return null;

  const initialRecommenders = recommenders.map((recommender) => ({
    label: [recommender.firstName, recommender.lastName].join(' '),
    value: availableTeachersData.availableTeachers.nodes.find(
      (availableTeacher) => availableTeacher.email === recommender.email
    )?.uuid,
  }));

  const initialValues: FormValues = {
    recommenders: initialRecommenders || [],
  };

  const availableTeachersOptions = availableTeachersData.availableTeachers.nodes.map(
    (availableTeacher: AvailableTeacher) => ({
      label: availableTeacher.fullName,
      value: availableTeacher.uuid,
    })
  );

  const handleSubmit = async ({ recommenders }: FormValues) => {
    const recommendersIds = compact(recommenders.map((recommender) => recommender.value));

    try {
      await selectTeachers({
        userUuids: recommendersIds,
        institutionId: parseInt(selectedApplication.institution.id),
      });
      callToast('success', t('student.postSecondary.recommendersSection.successMessage'));
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
    closeModal();
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={closeModal}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <RecommendersForm
          availableTeachersOptions={availableTeachersOptions}
          closeModal={closeModal}
          maxSelectedRecommenders={institutionData.institution.maxTeacherEval || 0}
          minSelectedRecommenders={institutionData.institution.minTeacherEval || 0}
        />
      </Formik>
    </SharedModal>
  );
};
